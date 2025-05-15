/**
 * Formats and extracts information from transcript data array
 * @param {string[]} arr - Array containing transcript data
 * @returns {Object} Formatted transcript information
 */
function formatTranscriptData(arr) {
  // Initialize the data structure
  const extractedInfo = {
    studentName: "",
    studentId: "",
    address: "",
    majors: [],
    minors: [],
    academicRecord: {
      totalCreditsAttempted: 0,
      totalCreditsEarned: 0,
      totalGradePoints: 0,
      cumulativeGPA: 0,
      semesters: [],
    },
  };

  // Initialize arrays for different sections of data
  let personal_info = [];
  let semester_and_course_details = [];
  let total_calculations = [];

  // Separate data into different sections
  let currentArray = personal_info;
  let courseHeaderFound = false;
  let previousLine = "";

  // Split data into sections
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (item.startsWith("Course   Course Title") && !courseHeaderFound) {
      courseHeaderFound = true;
      currentArray = semester_and_course_details;
      continue;
    }

    if (item.startsWith("Total Credits Attempted")) {
      currentArray = total_calculations;
    }

    if (item.startsWith("Course   Course Title") && courseHeaderFound) {
      continue;
    }

    // Handle multi-line course titles
    const courseCodePattern = /^[A-Z]{2,4}\d{3}[A-Z]?\s/;
    if (
      !courseCodePattern.test(item) &&
      currentArray === semester_and_course_details &&
      !item.startsWith("SUMMER") &&
      !item.startsWith("SPRING") &&
      !item.startsWith("AUTUMN") &&
      !item.startsWith("GPA") &&
      !item.includes("Semester Total")
    ) {
      if (previousLine && currentArray.length > 0) {
        currentArray[currentArray.length - 1] =
          previousLine + " " + item.trim();
      }
      continue;
    }

    currentArray.push(item);
    previousLine = item;
  }

  // Extract personal information
  const extractPersonalInfo = () => {
    try {
      // Extract ID and Name and Major
      const idLine = personal_info[1]?.split("   ") || [];
      extractedInfo.studentId = idLine[1]?.trim() || "";

      // Extract Name and start Major extraction
      let majors = [];
      const nameLine = personal_info[2]?.split("Major(s):") || [];
      if (nameLine[0]) {
        extractedInfo.studentName = nameLine[0].split("Name:")[1]?.trim() || "";
      }
      if (nameLine[1]) {
        majors.push(nameLine[1].trim());
      }

      // Check next line for major continuation
      if (personal_info[3] && !personal_info[3].startsWith("Address:")) {
        majors.push(personal_info[3].trim());
      }
      extractedInfo.majors = majors
        .join(" ")
        .split(",")
        .map((major) => major.trim())
        .filter(Boolean);

      // Extract Address
      let addressParts = [];
      let addressStartIndex = personal_info.findIndex((line) =>
        line.includes("Address:")
      );

      if (addressStartIndex !== -1) {
        let firstAddressPart = personal_info[addressStartIndex]
          .split("Address:")[1]
          .trim();
        addressParts.push(firstAddressPart);

        let nextLine = personal_info[addressStartIndex + 1];
        if (nextLine && !nextLine.includes("Minor:")) {
          let additionalPart = nextLine.split("Minor:")[0].trim();
          if (additionalPart) {
            addressParts.push(additionalPart);
          }
        }
      }

      extractedInfo.address = addressParts.join(" ").trim();

      // Extract Minor
      let minorLine = personal_info.find((line) => line.includes("Minor:"));
      if (minorLine) {
        const minorInfo = minorLine.split("Minor:")[1];
        if (minorInfo) {
          extractedInfo.minors = [minorInfo.trim()];
        }
      }
    } catch (error) {
      console.error("Error in extractPersonalInfo:", error);
    }
  };

  // Process course information
  const processCourseData = () => {
    let course_arr = [];
    let semester = "";
    let GPA = 0;
    let courses = [];
    let semesterTotal = "";

    for (let i = 0; i < semester_and_course_details.length; i++) {
      const item = semester_and_course_details[i];

      if (
        item.startsWith("SUMMER") ||
        item.startsWith("SPRING") ||
        item.startsWith("AUTUMN")
      ) {
        if (semester !== "") {
          course_arr.push({ semester, GPA, courses, semesterTotal });
        }
        semester = item;
        GPA = 0;
        courses = [];
        semesterTotal = "";
      } else if (item.startsWith("GPA")) {
        GPA = parseFloat(item.split(" : ")[1]);
      } else if (item.includes("Semester Total")) {
        semesterTotal = item;
      } else {
        let courseDetails = item.split("   ");
        let course = {
          courseCode: courseDetails[0],
          courseTitle: courseDetails[1],
          courseType:
            courseDetails[2] === "R" || courseDetails[2] === "T"
              ? courseDetails[2]
              : "",
          grade:
            courseDetails[2] === "R" || courseDetails[2] === "T"
              ? courseDetails[3]
              : courseDetails[2],
          creditHours: parseFloat(
            courseDetails[2] === "R" || courseDetails[2] === "T"
              ? courseDetails[4]
              : courseDetails[3]
          ),
          earnedCredits: parseFloat(
            courseDetails[2] === "R" || courseDetails[2] === "T"
              ? courseDetails[5]
              : courseDetails[4]
          ),
          gpaCredits: parseFloat(
            courseDetails[2] === "R" || courseDetails[2] === "T"
              ? courseDetails[6]
              : courseDetails[5]
          ),
          gradePoints: parseFloat(
            courseDetails[2] === "R" || courseDetails[2] === "T"
              ? courseDetails[7]
              : courseDetails[6]
          ),
        };
        courses.push(course);
      }
    }
    if (semester !== "") {
      course_arr.push({ semester, GPA, courses, semesterTotal });
    }
    return course_arr;
  };

  // Extract total calculations
  const extractTotalCalculations = () => {
    total_calculations.forEach((line) => {
      if (line.startsWith("Total Credits Attempted")) {
        extractedInfo.academicRecord.totalCreditsAttempted = parseFloat(
          line.split(":")[1]
        );
      } else if (line.startsWith("Total Credits Earned")) {
        extractedInfo.academicRecord.totalCreditsEarned = parseFloat(
          line.split(":")[1]
        );
      } else if (line.startsWith("Total Grade Point")) {
        extractedInfo.academicRecord.totalGradePoints = parseFloat(
          line.split(":")[1]
        );
      } else if (line.startsWith("Cumulative GPA")) {
        extractedInfo.academicRecord.cumulativeGPA = parseFloat(
          line.split(":")[1]
        );
      }
    });
  };

  // Process academic information
  const processAcademicInfo = (course_arr) => {
    extractedInfo.academicRecord.semesters = course_arr.map((semesterData) => ({
      semesterName: semesterData.semester,
      semesterGPA: semesterData.GPA,
      courses: semesterData.courses.map((course) => ({
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        courseType: course.courseType,
        grade: course.grade,
        creditHours: course.creditHours,
        earnedCredits: course.earnedCredits,
        gpaCredits: course.gpaCredits,
        gradePoints: course.gradePoints,
      })),
      semesterSummary: {
        totalCredits: parseFloat(semesterData.semesterTotal.split("   ")[1]),
        earnedCredits: parseFloat(semesterData.semesterTotal.split("   ")[2]),
        gpaCredits: parseFloat(semesterData.semesterTotal.split("   ")[3]),
        totalGradePoints: parseFloat(
          semesterData.semesterTotal.split("   ")[4]
        ),
      },
    }));
  };

  // Execute all extraction processes
  extractPersonalInfo();
  const course_arr = processCourseData();
  processAcademicInfo(course_arr);
  extractTotalCalculations();

  return extractedInfo;
}

// Export the function
export { formatTranscriptData };
