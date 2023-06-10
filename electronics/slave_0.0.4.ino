#include <esp_now.h>
#include <WiFi.h>
#include <esp_wifi.h>
uint8_t broadcastAddress[] = { 0x80, 0x7D, 0x3A, 0x0B, 0xE1, 0xDD };

const int SENSOR1_PIN = 33;
const int SENSOR2_PIN = 32;

int value_a1 = 0;  // 存储 "A1" 对应的整数值
int value_a0 = 0;  // 存储 "A0" 对应的整数值
int value_b1 = 0;  // 存储 "B1" 对应的整数值
int value_b0 = 0;  // 存储 "B0" 对应的整数值

// 定义比较函数
String compareStringArray(String string_array[], int int_array[], int array_length) {
  // int value_a1 = 0;          // 存储 "A1" 对应的整数值
  // int value_a0 = 0;          // 存储 "A0" 对应的整数值
  // int value_b1 = 0;          // 存储 "B1" 对应的整数值
  // int value_b0 = 0;          // 存储 "B0" 对应的整数值
  boolean found_a1 = false;  // 标记是否找到 "A1"
  boolean found_a0 = false;  // 标记是否找到 "A0"
  boolean found_b1 = false;  // 标记是否找到 "B1"
  boolean found_b0 = false;  // 标记是否找到 "B0"

  // 遍历数组，查找 "A1", "A0", "B1", "B0"
  for (int i = 0; i < array_length; i++) {
    if (string_array[i] == "A1") {
      value_a1 = int_array[i];
      found_a1 = true;
    } else if (string_array[i] == "A0") {
      value_a0 = int_array[i];
      found_a0 = true;
    } else if (string_array[i] == "B1") {
      value_b1 = int_array[i];
      found_b1 = true;
    } else if (string_array[i] == "B0") {
      value_b0 = int_array[i];
      found_b0 = true;
    }

    // 如果 "A1", "A0", "B1", "B0" 都找到了，就退出循环
    if (found_a1 && found_a0 && found_b1 && found_b0) {
      break;
    }
  }

  // 判断是否找到了 "A1" 和 "A0", "B1" 和 "B0"，并进行比较
  if (found_a1 && found_a0 && found_b1 && found_b0) {
    if ((((abs(value_a0 - value_a1)) > 50)) && ((abs(value_b0 - value_b1)) > 50)) {
      return "Valid";
    } else if (((abs(value_a0 - value_a1)) < 50) || (((abs(value_b0 - value_b1)) < 50))) {
      return "NotValid";
    }
  }
}

int peopleIN = 0;
int peopleOUT = 0;
int peopleREMAIN = 0;
int restroomID = 3;
String sensorArray[4] = { "0", "0", "0", "0" };  // 用于存储传感器状态的数组
int timeArray[4] = { 0, 0, 0, 0 };               // 用于储存传感器被触发的时间点
int array_length = 4;
String result;
int state_POS = 0;
bool ISR_STATUS = false;

void sensor1_isr() {
  if ((digitalRead(SENSOR1_PIN) == LOW) && (sensorArray[state_POS] == "0")) {
    sensorArray[state_POS] = "A1";
  } else if ((digitalRead(SENSOR1_PIN) == HIGH) && (sensorArray[state_POS] == "0")) {
    sensorArray[state_POS] = "A0";
  }
  timeArray[state_POS] = millis();
  state_POS++;
}

void sensor2_isr() {
  if ((digitalRead(SENSOR2_PIN) == LOW) && (sensorArray[state_POS] == "0")) {
    sensorArray[state_POS] = "B1";
  } else if ((digitalRead(SENSOR2_PIN) == HIGH) && (sensorArray[state_POS] == "0")) {
    sensorArray[state_POS] = "B0";
  }
  timeArray[state_POS] = millis();
  state_POS++;
}

typedef struct struct_message {
  int id;
  int x;  //toilet id
  int y;  //people IN / report
  int z;  //people OUT / occupied
  int k;  // cubic id
} struct_message;

struct_message myData;

//callback
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.print("\r\nLast Packet Send Status:\t");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
}

void setup() {
  delay(1000);
  Serial.begin(115200);
  Serial.println("Setup complete.");
  pinMode(SENSOR1_PIN, INPUT_PULLUP);
  pinMode(SENSOR2_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(SENSOR1_PIN), sensor1_isr, CHANGE);
  attachInterrupt(digitalPinToInterrupt(SENSOR2_PIN), sensor2_isr, CHANGE);


  WiFi.mode(WIFI_STA);
  esp_wifi_set_channel(11, WIFI_SECOND_CHAN_NONE);
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  esp_now_register_send_cb(OnDataSent);
  esp_now_peer_info_t peerInfo;
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;
  peerInfo.ifidx = WIFI_IF_STA;

  if (esp_now_add_peer(&peerInfo) != ESP_OK) {
    Serial.println("Failed to add peer");
    return;
  }
}

void loop() {
  result = compareStringArray(sensorArray, timeArray, array_length);

  if ((result == "Valid") && (state_POS == 4)) {
    if (sensorArray[0] == "A1" && sensorArray[1] == "A0" && sensorArray[2] == "B1" && sensorArray[3] == "B0") {
      peopleIN++;
    }
    if (sensorArray[0] == "A1" && sensorArray[1] == "B1" && sensorArray[2] == "A0" && sensorArray[3] == "B0") {
      peopleIN++;
    }
    if (sensorArray[0] == "B1" && sensorArray[1] == "B0" && sensorArray[2] == "A1" && sensorArray[3] == "A0") {
      peopleOUT++;
    }
    if (sensorArray[0] == "B1" && sensorArray[1] == "A1" && sensorArray[2] == "B0" && sensorArray[3] == "A0") {
      peopleOUT++;
    }
  }

  peopleREMAIN = peopleIN - peopleOUT;
  if (peopleREMAIN < 0) {
    peopleREMAIN = 0;
  }

  if (state_POS == 4) {
    Serial.print("RECORDED: ");
    Serial.println(result);
    // Serial.print("A0: ");
    // Serial.println(value_a0);
    // Serial.print("A1: ");
    // Serial.println(value_a1);
    // Serial.print("B0: ");
    // Serial.println(value_b0);
    // Serial.print("B1: ");
    // Serial.println(value_b1);
    // Serial.print("A0 - A1: ");
    // Serial.println(value_a0 - value_a1);
    // Serial.print("B0 - B1: ");
    // Serial.println(value_b0 - value_b1);
    for (int i = 0; i < 4; i++) {
      Serial.print(sensorArray[i]);
      Serial.print(": ");
      Serial.println(timeArray[i]);
      sensorArray[i] = "0";
      timeArray[i] = 0;
    }
    Serial.print("restroom ID: ");
    Serial.println(restroomID);
    Serial.print("people in: ");
    Serial.println(peopleIN);
    Serial.print("people out: ");
    Serial.println(peopleOUT);
    Serial.print("people Remain: ");
    Serial.println(peopleREMAIN);
    Serial.println();
    state_POS = 0;
  }

  // set    id=1 排队    2 cubic
  myData.id = 1;
  myData.x = restroomID;
  myData.y = peopleIN;
  myData.z = peopleOUT;

  //send data
  esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *)&myData, sizeof(myData));
  if (result == ESP_OK) {
    Serial.println("Sent with success");
  } else {
    Serial.println("Error sending the data");
  }
  delay(10000);
}
