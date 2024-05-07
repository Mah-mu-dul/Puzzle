import React, { useState } from 'react';

function Courses() {
    const [filter, setFilter] = useState('');

    const handleInputChange = (event) => {

        setFilter(event.target.value.toLowerCase());
    };

    const filterTable = (htmlContent) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        const rows = tempDiv.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let found = false;
            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];
                if (cell.textContent.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
            // Skip hiding the row if it contains <th> elements (table headers)
            if (rows[i].querySelectorAll('th').length > 0) {
                continue;
            }
            if (found) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }

        return tempDiv.innerHTML;
    };


    // Your HTML content as a string
    const htmlContent = `
    <div>
    <style>
        #myTable {
          background-color: white;
          border-collapse: collapse;
          
        }
        #myTable th,
        #myTable td {
          border: 1px solid #ddd;
          padding: 8px;
          width: auto;
        }
        #myTable tr:nth-child(odd) {
          background-color: #f2f2f2;
        }
      </style>
    <table  id="myTable" mat-table="" class="myTable" style="width: 100%; height: 400px;" role="table">
        <thead role="rowgroup">
            <tr  class="mat-header-row cdk-header-row ng-star-inserted">
                <th > Course </th>
                <th > Section </th>
                <th > Time </th>
                <th > Capacity </th>
                <th > Credit </th>
                <th > Title </th>
                <th > Faculty </th><!---->
            </tr><!---->
        </thead>
        <tbody role="rowgroup">
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> AAT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Art and Aesthetics </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Sanjoy
                        Chakraborty
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> AAT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Art and Aesthetics </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Sanjoy
                        Chakraborty
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Bokhtiar Ahmed
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mohammad Mahfuzul
                        Islam </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mohammad Mahfuzul
                        Islam </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Reza Habib
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Nazneen Akter
                        Banu
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> PROF A K M Mazharul
                        Islam </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Faruk Shah
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Nazia Mahmood
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Rezwana Karim
                        Snigdha
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Nazia Mahmood
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 11 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Nure Maksurat
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 12 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Faruk Shah
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ANT101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 13 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Anthropology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Rezwana Karim
                        Snigdha
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BDS109 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh 1971 through the Lenses </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Janina Islam Abir
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BDS109 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh 1971 through the Lenses </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mahmud Hasan
                        Kayesh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BDS109 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh 1971 through the Lenses </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mahmud Hasan
                        Kayesh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BDS109 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh 1971 through the Lenses </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Momtaz Parvin
                        Mumu
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BDS109 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh 1971 through the Lenses </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BDS109 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh 1971 through the Lenses </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Mushfeqa Islam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BDS109 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh 1971 through the Lenses </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Momtaz Parvin
                        Mumu
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BDS109 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh 1971 through the Lenses </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Zaheed Reza Noor
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BDS109 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh 1971 through the Lenses </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Zaheed Reza Noor
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BLA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangla Literature and Art </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> PROF Mynoddin Ahmed
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BLA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangla Literature and Art </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> PROF Mynoddin Ahmed
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BLA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangla Literature and Art </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Muhammad Shajjad
                        Ahsan </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BLA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangla Literature and Art </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Muhammad Shajjad
                        Ahsan </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BNG201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangla Literature </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BNG201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangla Literature </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BNG201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangla Literature </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BNG201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangla Literature </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BPH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh Political History </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Sayed Abu Touab
                        Shakir </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BPH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh Political History </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Rashed Uz Zaman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BPH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh Political History </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Rashed Uz Zaman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BPH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh Political History </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Kazi Mahmudur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> BPH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Bangladesh Political History </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Nure Maksurat
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CHI101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 25 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Elementary Chinese-I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Tasneem Shahrukh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Tasneem Shahrukh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Raisa Rasheeka
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Raisa Rasheeka
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Janina Islam Abir
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mahmud Hasan
                        Kayesh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Momtaz Parvin
                        Mumu
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Mushfeqa Islam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 11 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Al-Amin Khan
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CMN201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 12 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Introduction to Computer Programming </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Ashraful Islam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Introduction to Computer Programming </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Ashraful Islam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Introduction to Computer Programming </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Sanzar Adnan Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Introduction to Computer Programming </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MS Ajmiri Sabrina
                        Khan
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Introduction to Computer Programming </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Md. Abu Sayed
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> AT: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Lab for CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Nabarun Halder
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> SR: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Lab for CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Jahanggir Hossain
                        Setu </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> AW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Lab for CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Jahanggir Hossain
                        Setu </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> M: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Lab for CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Jahanggir Hossain
                        Setu </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSC101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> W: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Lab for CSC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Md Junayed
                        Hossain
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ECN200 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Economics </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ECN200 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Economics </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ECN200 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Economics </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG099 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 0 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Remedial English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 11 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 12 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 13 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 14 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 15 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Listening &amp; Speaking Skills </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 11 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 12 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 13 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 14 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 15 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 16 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 17 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 18 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 19 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> English Reading Skills </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 11 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 12 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 13 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 14 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 15 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENG105 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 16 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Business English </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENV100 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Basics of Climate Change </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Karishma Sinha
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> ENV100 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Basics of Climate Change </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> FRN101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Elementary French I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> FRN101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Elementary French I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> FRN101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 25 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Elementary French I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> FRN101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 25 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Elementary French I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> FRN101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Elementary French I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> GSG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Global Studies </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Marufa Akter
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> GSG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Global Studies </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Ohidujjaman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> GSG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Global Studies </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Ohidujjaman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> GSG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Global Studies </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Sultana Razia
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> GSG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Global Studies </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Ahnaf Ashiqur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> GSG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Global Studies </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Firoza Ashravee
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> GSG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Global Studies </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Firoza Ashravee
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> GSG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Global Studies </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Sultana Razia
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> GSG101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Global Studies </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Ahnaf Ashiqur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Nafisa Huq
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Nafisa Huq
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Shabareen Tisha
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Shabareen Tisha
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Shabareen Tisha
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Shabareen Tisha
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Tasnuva Faruk
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Tasnuva Faruk
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Tasnuva Faruk
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Tasnuva Faruk
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 11 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Rabiul Islam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 12 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Rabiul Islam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 13 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Rabiul Islam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 14 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Zareen Tasnim
                        Tapti
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 15 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Moinul Haque
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HEA101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 16 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Health and Society </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HST103 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> History &amp; Civilization </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Sayed Abu Touab
                        Shakir </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> HST103 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> History &amp; Civilization </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Sayed Abu Touab
                        Shakir </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> JPN101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 25 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Elementary Japanese </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> JPN112 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> R: 1300-1600 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Japanese Cinema: Naiton and Globalization
                    </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Zakir Hossain
                        Raju
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> KRN101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Elementary Korean </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Myungsoo Kim
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> KRN101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Elementary Korean </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Myungsoo Kim
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Mehir Amin
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Rifat Ara Rouf
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Jewel Kumar Ghosh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Nayema Islam Nima
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Mehir Amin
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Taposh Kumar Das
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 11 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Calculus and analytical geometry </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT212 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Probability &amp; Statistics for Science &amp;
                        Engineering </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Shipra Banik
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT212 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Probability &amp; Statistics for Science &amp;
                        Engineering </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mohammed Anwer
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT212 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Probability &amp; Statistics for Science &amp;
                        Engineering </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Shipra Banik
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT212 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Probability &amp; Statistics for Science &amp;
                        Engineering </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mohammed Anwer
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT212 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Probability &amp; Statistics for Science &amp;
                        Engineering </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Manir Hossain
                        Mollah
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT212 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Probability &amp; Statistics for Science &amp;
                        Engineering </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Manir Hossain
                        Mollah
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MUS101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Music Appreciation </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Shahnaz Nasrin
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MUS101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Music Appreciation </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Shahnaz Nasrin
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MUS102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Nazrul and Abbasuddin's Contribution </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Shahnaz Nasrin
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ranjan Saha
                        Partha
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ranjan Saha
                        Partha
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Nure Maksurat
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Nure Maksurat
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Masood Imran
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Masood Imran
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Reza Habib
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Dr. Md. Ilias
                        Kamal
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Nazia Mahmood
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> PROF A K M Mazharul
                        Islam </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 11 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Nazneen Akter
                        Banu
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> NCH101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 12 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> National Culture &amp; Heritage </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Mahbuba Dewan
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHL101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Philosophy </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Qudrate Khoda
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHL101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introduction to Philosophy </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Syed Moynul Alam
                        Nizar </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHL206 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Philosophy of Religion </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Syed Moynul Alam
                        Nizar </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Dr. Farhad Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Asma Begum
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Readul Mahmud
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mahbub Alam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ruma Parvin
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Jewel Kumar Ghosh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ruma Parvin
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ruma Parvin
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> W: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mahbub Alam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Zerin Tasnim
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Abu Zafur
                        Ziauddin
                        Ahmed </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Saddam Sheikh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> W: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Abu Zafur
                        Ziauddin
                        Ahmed </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mohammad Majidur
                        Rahman </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mohammad Majidur
                        Rahman </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Saddam Sheikh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> W: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Saddam Sheikh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 11 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Zerin Tasnim
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 12 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Zerin Tasnim
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 13 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ain-ul Huda
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 14 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Saddam Sheikh
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY101L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 15 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-I Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ain-ul Huda
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-II </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Dr. Farhad Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> PHY102 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> University Physics-II </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Dr. Farhad Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> PHY102L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> S: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> University Physics-II Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Mahbub Alam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> PHY102L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> W: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> University Physics-II Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Mahbub Alam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> PHY102L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> S: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> University Physics-II Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Mahbub Alam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> PHY102L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> T: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> University Physics-II Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Ruma Parvin
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> PHY102L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> M: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> University Physics-II Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Abu Zafur
                        Ziauddin
                        Ahmed </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introductory Sociology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Sharmeen Ahmed
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introductory Sociology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Sharmeen Ahmed
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introductory Sociology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Obydullah Al
                        Marjuk
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introductory Sociology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Obydullah Al
                        Marjuk
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introductory Sociology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Sharmeen Ahmed
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introductory Sociology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introductory Sociology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Dr. Md. Ilias
                        Kamal
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introductory Sociology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Mahbuba Dewan
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC101 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Introductory Sociology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> PROF A. I. Mahbub
                        Uddin
                        Ahmed </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC202 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Social Psychology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Mahbuba Dewan
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC202 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Social Psychology </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Mahbuba Dewan
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> SOC301 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Social Science Research Methodology </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Obydullah Al
                        Marjuk
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electrical Circuit Analysis </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ferdows Zahid
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electrical Circuit Analysis </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Ajmiri Sabrina
                        Khan
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electrical Circuit Analysis </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electrical Circuit Analysis </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE104L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Lab work based on CSE 104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE104L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Lab work based on CSE 104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE104L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Lab work based on CSE 104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE104L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Lab work based on CSE 104 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Discrete Mathematics </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Habib Bin
                        Muzaffar
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Discrete Mathematics </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mohammad Motiur
                        Rahman </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Discrete Mathematics </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mohammad Motiur
                        Rahman </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE201 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Discrete Mathematics </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Razib Hayat Khan
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Sajed Imtenanul
                        Haque
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Sajed Imtenanul
                        Haque
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR MM Mahbubul
                        Sayeed
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MS Kaniz Fatema
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Farzana Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MS Kaniz Fatema
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR AKM Mahbubur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR MM Mahbubul
                        Sayeed
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR AKM Mahbubur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Asif Mahmood
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> S: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> S: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> S: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> S: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> S: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> S: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 7 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> M: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 8 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> M: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 9 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> M: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE203L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 10 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> M: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Data Structure Lab </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Asif Mahmood
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE204 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Digital Logic Design </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Tarem Ahmed
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE204 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Digital Logic Design </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Tarem Ahmed
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE204 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 20 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Digital Logic Design </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Tarem Ahmed
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE204 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Digital Logic Design </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Zahangir Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE204L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 204 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Shirazim
                        Munir
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE204L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 204 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Shirazim
                        Munir
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE204L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 204 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Shirazim
                        Munir
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE204L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 204 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Shirazim
                        Munir
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE210 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electronics I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Saadia Binte Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE210 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electronics I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Saadia Binte Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE210 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electronics I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Faisal Uddin
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE210 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electronics I </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Saadia Binte Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE210L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 210 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Hasibur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE210L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 210 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Hasibur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE210L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> W: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 210 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Hasibur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE210L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 210 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Hasibur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Algorithms </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Hossain Md
                        Shakhawat
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Algorithms </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Hossain Md
                        Shakhawat
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Algorithms </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mohammad Motiur
                        Rahman </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Algorithms </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Hossain Md
                        Shakhawat
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Algorithms </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Asif Bin Khaled
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md Junayed
                        Hossain
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Shad Ahmed
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md Junayed
                        Hossain
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE211L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 211 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Shad Ahmed
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Object Oriented Programming </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Subrata Kumar Dey
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Object Oriented Programming </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Subrata Kumar Dey
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Object Oriented Programming </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Asif Mahmood
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Object Oriented Programming </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Md. Aquib Azmain
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Object Oriented Programming </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Md. Aquib Azmain
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Object Oriented Programming </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Subrata Kumar Dey
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> S: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Labwork based on CSE 213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Subrata Kumar Dey
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> T: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Labwork based on CSE 213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Subrata Kumar Dey
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> M: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Labwork based on CSE 213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> DR Asif Mahmood
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> W: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Labwork based on CSE 213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Md. Aquib Azmain
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 5 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> M: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Labwork based on CSE 213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Md. Aquib Azmain
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course5"> CSE213L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course5"> 6 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course5 no-warp"> W: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course5"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course5"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course5"> Labwork based on CSE 213 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course5"> MR Subrata Kumar Dey
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE214 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Computer Organization &amp; Architecture
                    </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Bijoy Rahman Arif
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE214 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Computer Organization &amp; Architecture
                    </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Tarek Habib
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE214 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Computer Organization &amp; Architecture
                    </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Tarek Habib
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE216 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Microprocessor Interfacing &amp; Assembly
                        Language
                    </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mohammad
                        Shidujaman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE216L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 216 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE216L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> W: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 216 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE303 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Database Management </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Sadita Ahmed
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE303 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Database Management </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mahady Hasan
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE303 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Database Management </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mahady Hasan
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE303L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE303 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE303L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE303 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE303L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE303 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE307 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> System Analysis and Design </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Sabrina Alam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE307 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> System Analysis and Design </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MS Sabrina Alam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE307 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 0 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> System Analysis and Design </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE307 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 0 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> System Analysis and Design </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE309 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Web Application &amp; Internet </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Farzana Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE309 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Web Application &amp; Internet </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE309 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> W: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 0 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Web Application &amp; Internet </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE309 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 0 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Web Application &amp; Internet </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE310 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electronics II </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ferdows Zahid
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE310 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Electronics II </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ferdows Zahid
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE310L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 310 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Hasibur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE310L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 310 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Hasibur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE313 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Compiler Construction </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR Bijoy Rahman Arif
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE313 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Compiler Construction </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR Bijoy Rahman Arif
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE313 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Compiler Construction </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR Bijoy Rahman Arif
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE313 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> R: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 0 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Compiler Construction </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE315 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> MW: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Design of Operating System </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR Mohammad Noor
                        Nabi
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE315 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> MW: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Design of Operating System </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR Mohammad Noor
                        Nabi
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE315 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> ST: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Design of Operating System </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR Mohammad Noor
                        Nabi
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE316 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Data Communication &amp; Computer Networks
                    </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Fahad Monir
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE316 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Data Communication &amp; Computer Networks
                    </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Fahad Monir
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE316 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Data Communication &amp; Computer Networks
                    </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE316L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1830-2000 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 316 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE316L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE 316 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> 00 TBA TBA </span>
                </td>
                <!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE317 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Numerical Methods </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Amin Ahsan Ali
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE317 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Numerical Methods </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Amin Ahsan Ali
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE317L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE317 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mahmudul Haque
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE317L </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 0800-0930 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Labwork based on CSE317 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Mahmudul Haque
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE400 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Data Communication </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Md. Fahad Monir
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE406 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Cryptography and Network Security </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Zahangir Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE417 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Data Mining and Warehouse </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR AKM Mahbubur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE420 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> S: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Image Processing </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> DR Hossain Md
                        Shakhawat
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE424 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> W: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Neural Networks </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR AKM Mahbubur
                        Rahman
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE425 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> T: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Artificial Intelligence </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> DR Amin Ahsan Ali
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE431 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Advanced Object Oriented Programming </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Subrata Kumar Dey
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE433 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> W: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Introduction to Parallel Programming </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR Bijoy Rahman Arif
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE434 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> W: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Advance Programming in UNIX </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR Mohammad Noor
                        Nabi
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE437 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Theory of Computation &amp; Automata </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Ashraful Amin
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE437 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Theory of Computation &amp; Automata </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Ashraful Amin
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE437 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Theory of Computation &amp; Automata </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Bijoy Rahman Arif
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE451 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> S: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Software Engineering </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> DR Mahady Hasan
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE454 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> M: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Software Engineering Process Management </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MS Sabrina Alam
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE457 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> T: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Project Management </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> DR Mahady Hasan
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course3"> CSE462 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course3"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course3 no-warp"> M: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course3"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course3"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course3"> Entrepreneurship Development </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course3"> MR Sanzar Adnan Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE464 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> W: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Mobile Application Development </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> MR Sanzar Adnan Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSE490 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> M: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 25 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Special Topics in Computer Science &amp;
                        Engineering </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Ashraful Islam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1620-1750 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Linear Algebra- vectors and matrices </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Md. Sarwar Alam
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Linear Algebra- vectors and matrices </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mohammed Anwer
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Linear Algebra- vectors and matrices </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Asma Begum
                    </span>
                </td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT203 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 4 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Linear Algebra- vectors and matrices </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Rifat Ara Rouf
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT301 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> MW: 1120-1250 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 40 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Ordinary Diff Equations </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Mohammed Anwer
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT301 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 2 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 0940-1110 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 41 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Ordinary Diff Equations </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Rifat Ara Rouf
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT301 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> AR: 1440-1610 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 45 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Ordinary Diff Equations </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> PROF Laek Sazzad
                        Andallah </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> MAT401 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> ST: 1300-1430 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 30 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Graph Theory </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Habib Bin
                        Muzaffar
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSC420 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> S: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Image Processing and Pattern Recognition
                    </span>
                </td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Hossain Md
                        Shakhawat
                    </span></td><!---->
            </tr>
            <tr  >

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-courseId mat-column-courseId ng-star-inserted"><span
                        style="padding-left: 6px;" class="eligible-course0"> CSC425 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-section mat-column-section ng-star-inserted"><span
                        class="eligible-course0"> 1 </span></td>
                <td role="cell" mat-cell="" class="mat-cell cdk-cell cdk-column-time mat-column-time ng-star-inserted">
                    <span class="eligible-course0 no-warp"> T: 1830-2130 </span>
                </td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-capacity mat-column-capacity ng-star-inserted"><span
                        class="eligible-course0"> 35 </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell cdk-column-credit mat-column-credit ng-star-inserted"><span
                        class="eligible-course0"> 3 </span></td>

                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-name mat-column-name ng-star-inserted"><span
                        class="eligible-course0"> Artificial Intelligence </span></td>
                <td role="cell" mat-cell=""
                    class="mat-cell cdk-cell course-text cdk-column-facualty mat-column-facualty ng-star-inserted"><span
                        style="padding-left: 7px;" class="eligible-course0"> DR Amin Ahsan Ali
                    </span></td><!---->
            </tr><!----><!---->
        </tbody>
        <tfoot role="rowgroup" style="display: none; bottom: 0px; z-index: 10;" class="mat-table-sticky"><!----></tfoot>
    </table>
    
    </div>
    
    `;

    return (
        <div>
            <div className="text-left md:text-center">

                <h1 className="text-3xl  font-semibold">Simplifying Your Course Search</h1>
                <br />
                <h1 className=" text-xl ">This course list is for
                    <span className="font-bold text-rose-500"> CSE </span>
                    Mejor and
                    <span className="font-bold text-rose-500"> Robotics </span>
                    Minor
                </h1>
                <p className=" text-lg ">
                    This is valid for the
                    <span className="font-bold text-rose-500"> Summer 2024 </span>
                    only, and if authority changes occur after
                    <span className="font-bold text-rose-500"> May 8, 2024 </span>, it will not be updated.
                    <br />
                    <div className="tooltip" data-tip="This feature will assist you on the day of registration when IRAS does not display the courses before your time slot arrives.">
                        <p className='px-[10px] w-fit ml-3 rounded-full border-black border ' >?</p>
                    </div>
                </p>
            </div>
            <br />
            <input
                className="input bg-white border"
                type="text"
                id="filterInput"
                placeholder="Search for something..."
                onChange={handleInputChange}
            />
            <br />
            <br />
            {/* Render the HTML content using dangerouslySetInnerHTML */}
            <div className="overflow-scroll" dangerouslySetInnerHTML={{ __html: filterTable(htmlContent) }} />
        </div >
    );
}

export default Courses;
