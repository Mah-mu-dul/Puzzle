import React, { useState } from "react";
import image1 from "./photos/circuit_image (1).png";
import image2 from "./photos/image copy 2.png";
import image3 from "./photos/image copy 3.png";
import image4 from "./photos/image copy 4.png";
import image5 from "./photos/image copy 5.png";

const DLD = () => {
  const images = [image1, image2, image3, image4, image5];
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState(`

#define NUM_SENSORS 5

// Sensor pins
const int sensorPins[NUM_SENSORS] = { A1, A2, A3, A4, A5};

// Motor driver pins
const int IN1 = 5;
const int IN2 = 6;
const int IN3 = 9;
const int IN4 = 10;

// Thresholds for 5 sensors
int thresholds[NUM_SENSORS] = {120, 120, 120, 120, 120};

// PID constants
float Kp = 0.02;
float Ki = 0.003;
float Kd = 0.07;

// PID variables
float error = 0;
float previousError = 0;
float integral = 0;
float derivative = 0;

// Motor speed variables
int baseSpeed = 200;
int maxSpeed = 255;
int turnSpeed = 200;  // Reduced turn speed

// Line detection variables
bool onLine = false;
int lastLinePosition = 0;

// Turn detection
bool turnDetected = false;
unsigned long turnStartTime = 0;
const unsigned long turnDuration = 750; // Time to perform turn (ms)

// Turn direction
enum TurnDirection {
  LEFT,
  RIGHT,
  NONE
};

TurnDirection currentTurn = NONE;

void setup() {

  // Initialize sensor pins as inputs
  for (int i = 0; i < NUM_SENSORS; i++) {
    pinMode(sensorPins[i], INPUT);
  }

  // Initialize motor driver pins as outputs
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  
  pinMode(3, OUTPUT);
  pinMode(5, OUTPUT);

  digitalWrite(3,HIGH);
  digitalWrite(5,HIGH);


  Serial.begin(9600);

  calibrateSensors(); // Call the calibration function
}

void calibrateSensors() {
  Serial.println("Calibrating sensors...");

  // Arrays to store min and max values for each sensor
  int minValues[NUM_SENSORS];
  int maxValues[NUM_SENSORS];

  // Initialize min and max arrays
  for (int i = 0; i < NUM_SENSORS; i++) {
    minValues[i] = 1023; // Start with max possible value
    maxValues[i] = 0;    // Start with min possible value
  }

  // Calibration routine
  for (int i = 0; i < 5000; i++) { // Increased iterations for better calibration
    for (int j = 0; j < NUM_SENSORS; j++) {
      int sensorValue = analogRead(sensorPins[j]);

      // Update min and max values
      if (sensorValue < minValues[j]) minValues[j] = sensorValue;
      if (sensorValue > maxValues[j]) maxValues[j] = sensorValue;
    }
    delay(2); // Short delay between readings
  }

  // Calculate and set thresholds
  for (int i = 0; i < NUM_SENSORS; i++) {
    thresholds[i] = (minValues[i] + maxValues[i]) / 2;
    Serial.print("Sensor ");
    Serial.print(i);
    Serial.print(" threshold: ");
    Serial.println(thresholds[i]);
  }

  Serial.println("Calibration complete!");
}

void loop() {
  // Read sensor values
  int sensorValues[NUM_SENSORS];
  readSensors(sensorValues);

  // Check for turn
  currentTurn = detectTurn(sensorValues);

  if (currentTurn != NONE) {
    handleTurn(currentTurn);
  } else {
    // Calculate error for PID
    error = calculateError(sensorValues);

    // Check if the robot is on the line
    onLine = (error != 0);

    if (onLine) {
      // Normal PID control
      integral = constrain(integral + error, -100, 100);
      derivative = error - previousError;

      float adjustment = Kp * error + Ki * integral + Kd * derivative;

      int leftSpeed = baseSpeed - adjustment;
      int rightSpeed = baseSpeed + adjustment;

      leftSpeed = constrain(leftSpeed, 0, maxSpeed);
      rightSpeed = constrain(rightSpeed, 0, maxSpeed);

      setMotorSpeeds(leftSpeed, rightSpeed);

      lastLinePosition = error;
    } else {
      // Line recovery behavior
      if (lastLinePosition < 0) {
        setMotorSpeeds(turnSpeed, -turnSpeed);
      } else {
        setMotorSpeeds(-turnSpeed, turnSpeed);
      }
    }

    previousError = error;
  }

  printDebugInfo();
  delay(10);
}

void readSensors(int* sensorValues) {
  for (int i = 0; i < NUM_SENSORS; i++) {
    int rawValue = analogRead(sensorPins[i]);
    sensorValues[i] = rawValue > thresholds[i] ? 1 : 0; // 1 for black (line), 0 for white
  }
}

TurnDirection detectTurn(int* sensorValues) {
  int leftActiveSensors = 0;
  int rightActiveSensors = 0;

  // Count active sensors on the left and right sides
  for (int i = 0; i < 2; i++) {
    if (sensorValues[i]) leftActiveSensors++;
    if (sensorValues[NUM_SENSORS - 1 - i]) rightActiveSensors++;
  }

  // Detect left turn
  if (leftActiveSensors > 1 && rightActiveSensors == 0) {
    return RIGHT;
  }
  // Detect right turn
  else if (rightActiveSensors > 1 && leftActiveSensors == 0) {
    return LEFT;
  }

  return NONE;
}

void handleTurn(TurnDirection direction) {
  if (millis() - turnStartTime > turnDuration) {
    turnDetected = false;
    turnStartTime = 0;
    return;
  }

  if (turnStartTime == 0) {
    turnStartTime = millis();
  }

  // Execute turn based on detected direction
  if (direction == LEFT) {
    setMotorSpeeds(abs(-turnSpeed / 2), turnSpeed);
  } else if (direction == RIGHT) {
    setMotorSpeeds(turnSpeed, abs(-turnSpeed / 2));
  }
}

float calculateError(int* sensorValues) {
  float weightedSum = 0;
  int activeSensors = 0;

  for (int i = 0; i < NUM_SENSORS; i++) {
    if (sensorValues[i]) {
      weightedSum += (i - (NUM_SENSORS - 1) / 2.0) * 1000;
      activeSensors++;
    }
  }

  if (activeSensors == 0) {
    return lastLinePosition; // Return last known position if no sensors are active
  }

  return weightedSum / activeSensors;
}

void setMotorSpeeds(int leftSpeed, int rightSpeed) {
  analogWrite(IN1, abs(leftSpeed));
  analogWrite(IN2, 0);
  analogWrite(IN3, abs(rightSpeed));
  analogWrite(IN4, 0);

  if (leftSpeed < 0) {
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, HIGH);
  }
  if (rightSpeed < 0) {
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, HIGH);
  }
}

void printDebugInfo() {
  Serial.print("Error: ");
  Serial.print(error);
  Serial.print("\tLeft Speed: ");
  Serial.print(baseSpeed - (Kp * error + Ki * integral + Kd * derivative));
  Serial.print("\tRight Speed: ");
  Serial.print(baseSpeed + (Kp * error + Ki * integral + Kd * derivative));
  Serial.print("\tTurn: ");
  Serial.print(currentTurn == LEFT ? "Left" : (currentTurn == RIGHT ? "Right" : "None"));
  Serial.print("\tLast Position: ");
  Serial.println(lastLinePosition > 0 ? "Right" : "Left");
}


    `);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 2000); // Hide tooltip after 2 seconds
  };

  const imageElements = images.map((image, index) => (
    <div
      key={index}
      className="flex flex-col items-center p-4 border-2 border-gray-400 rounded-lg shadow-md"
    >
      <img
        src={image}
        alt={`DLD Course Image ${index + 1}`}
        className="mb-2  "
        style={{ width: "100%", height: "auto" }}
      />
      <a
        href={image}
        download
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download
      </a>
    </div>
  ));

  return (
    <div className="px-4">
      <h1
        className="text-3xl mb-4"
        style={{ fontWeight: "bold", color: "#6B7280" }}
      >
        DLD Project
      </h1>
      <p className="text-lg mb-8" style={{ color: "#6B7280" }}>
        Delve into the world of robotics with our LFR project.
      </p>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        View Demo Code 
      </button>
      <dialog
        id="my_modal_4"
        className="modal"
        onClick={(e) => {
          if (e.target === document.getElementById("my_modal_4")) {
            document.getElementById("my_modal_4").close();
          }
        }}
      >
        <div className="modal-box w-11/12 max-w-5xl bg-gray-800 text-white">
          <h3 className="font-bold text-lg">Code Preview</h3>
          <button
            className="btn mt-4 mb-4"
            onClick={handleCopy}
            data-tip="Text copied"
            data-tooltip-id="tooltip"
          >
            Copy Code
          </button>
          {tooltipVisible && (
            <div className="tooltip tooltip-bottom" data-tip="Text copied">
              Text copied
            </div>
          )}
          <div className="py-4">
            <pre data-prefix="~">
              <code>
                <pre>
                  <code>{code}</code>
                </pre>
              </code>
            </pre>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <br />
      <br />
      <div className="flex flex-wrap justify-center gap-4">{imageElements}</div>
    </div>
  );
};

export default DLD;
