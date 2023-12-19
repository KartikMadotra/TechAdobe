
#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"
#define LED 4
// Insert your network credentials
#define WIFI_SSID "Beeta"
#define WIFI_PASSWORD "9416638427"

// Insert Firebase project API Key
#define API_KEY "AIzaSyCxDdqgUvr2trq7kniba6nc4FFJcMA8qKM"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "testing-b2a8c-default-rtdb.firebaseio.com"
#define ledstatus
//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;

void setup(){
  Serial.begin(115200);
  pinMode(LED,OUTPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop(){
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 1500 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // Write an Int number on the database path test/int
    //If value is 0 then trun  light builtdin else 1 trun on 
    int LED_value = 1;
//    if (Firebase.RTDB.setString(&fbdo, "LED_Builtin", "HIGH")){
//      Serial.println("PASSED");
//      Serial.println("PATH: " + fbdo.dataPath());
//      Serial.println("TYPE: " + fbdo.dataType());
//    }
//    else {
//      Serial.println("FAILED");
//      Serial.println("REASON: " + fbdo.errorReason());
//    }






if (Firebase.RTDB.getString(&fbdo, "drawingone")){
//    Serial.println(fbdo.stringData());
    if (fbdo.stringData() == "on"){
       Serial.print(11);
       Serial.print("\n");
     
    } else {
      Serial.print(1);
      Serial.print("\n");
//        digitalWrite(LED, LOW);
      
       // Adjust the delay time as needed
        
    }
}



if (Firebase.RTDB.getString(&fbdo, "drawingtwo")){
//    Serial.println(fbdo.stringData());
    if (fbdo.stringData() == "on"){
       Serial.print(22);
       Serial.print("\n");
     
    } else {
      Serial.print(2);
      Serial.print("\n");
//        digitalWrite(LED, LOW);
      
       // Adjust the delay time as needed
        
    }
}



if (Firebase.RTDB.getString(&fbdo, "drawingthree")){
//    Serial.println(fbdo.stringData());
    if (fbdo.stringData() == "on"){
       Serial.print(33);
       Serial.print("\n");
     
    } else {
      Serial.print(3);
      Serial.print("\n");
//        digitalWrite(LED, LOW);
      
       // Adjust the delay time as needed
        
    }
}



if (Firebase.RTDB.getString(&fbdo, "drawingfour")){
//    Serial.println(fbdo.stringData());
    if (fbdo.stringData() == "on"){
       Serial.print(44);
       Serial.print("\n");
     
    } else {
      Serial.print(4);
      Serial.print("\n");
//        digitalWrite(LED, LOW);
      
       // Adjust the delay time as needed
        
    }
}



if (Firebase.RTDB.getString(&fbdo, "drawingfive")){
//    Serial.println(fbdo.stringData());
    if (fbdo.stringData() == "on"){
       Serial.print(55);
       Serial.print("\n");
     
    } else {
      Serial.print(5);
      Serial.print("\n");
//        digitalWrite(LED, LOW);
      
       // Adjust the delay time as needed
        
    }
}



if (Firebase.RTDB.getString(&fbdo, "drawingsix")){
//    Serial.println(fbdo.stringData());
    if (fbdo.stringData() == "on"){
       Serial.print(66);
       Serial.print("\n");
     
    } else {
      Serial.print(6);
      Serial.print("\n");
//        digitalWrite(LED, LOW);
      
       // Adjust the delay time as needed
        
    }
}



if (Firebase.RTDB.getString(&fbdo, "drawingseven")){
//    Serial.println(fbdo.stringData());
    if (fbdo.stringData() == "on"){
       Serial.print(77);
       Serial.print("\n");
     
    } else {
      Serial.print(7);
      Serial.print("\n");
//        digitalWrite(LED, LOW);
      
       // Adjust the delay time as needed
        
    }
}



if (Firebase.RTDB.getString(&fbdo, "drawingeight")){
//    Serial.println(fbdo.stringData());
    if (fbdo.stringData() == "on"){
       Serial.print(88);
       Serial.print("\n");
     
    } else {
      Serial.print(8);
      Serial.print("\n");
//        digitalWrite(LED, LOW);
      
       // Adjust the delay time as needed
        
    }
}




if (Firebase.RTDB.getString(&fbdo, "laser")){
//    Serial.println(fbdo.stringData());
    if (fbdo.stringData() == "on"){
       Serial.print(99);
       Serial.print("\n");
     
    } else {
      Serial.print(9);
      Serial.print("\n");
//        digitalWrite(LED, LOW);
      
       // Adjust the delay time as needed
        
    }
}










}
}
