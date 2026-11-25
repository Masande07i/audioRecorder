import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";

export default function RecorderScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const startRecording = async () => {
    const permission = await AudioModule.requestRecordingPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Microphone Permission",
        "Please allow microphone access to record voice notes."
      );
      return;
    }

    await recorder.prepareToRecordAsync();
    recorder.record();

    setIsRecording(true);
  };

  const stopRecording = async () => {
    await recorder.stop();

    setIsRecording(false);

    Alert.alert("Recording Saved", "Your voice recording has been saved.");

    router.back();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </Pressable>

      <Text style={styles.title}>New Voice Note</Text>

      <Text style={styles.timer}>00:00</Text>

      <Text style={styles.status}>
        {isRecording ? "Recording..." : "Ready to record"}
      </Text>

      <Pressable
        style={[
          styles.recordButton,
          isRecording && styles.stopButton,
        ]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons
          name={isRecording ? "stop" : "mic"}
          size={36}
          color="#FFFFFF"
        />
      </Pressable>

      <Text style={styles.instruction}>
        {isRecording ? "Tap to stop recording" : "Tap to start recording"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1628",
    alignItems: "center",
    padding: 24,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 100,
  },

  timer: {
    color: "#60A5FA",
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 70,
  },

  status: {
    color: "#94A3B8",
    fontSize: 16,
    marginTop: 15,
  },

  recordButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#60A5FA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },

  stopButton: {
    backgroundColor: "#EF4444",
  },

  instruction: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 20,
  },
});