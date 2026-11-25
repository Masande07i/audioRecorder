import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";

export default function RecorderScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);

  const waveformBars = [
    20, 35, 50, 30, 65, 45, 70, 40, 60, 30, 50, 75, 35,
  ];

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    const permission =
      await AudioModule.requestRecordingPermissionsAsync();

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

    console.log("Recording URI:", recorder.uri);
    console.log(
      "Recording duration:",
      recorderState.durationMillis
    );

    Alert.alert(
      "Recording Saved",
      `Duration: ${formatTime(recorderState.durationMillis)}`
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#FFFFFF"
        />
      </Pressable>

      <View style={styles.waveform}>
        {waveformBars.map((height, index) => (
          <View
            key={index}
            style={[
              styles.waveBar,
              { height },
            ]}
          />
        ))}
      </View>

      <Text style={styles.timer}>
        {formatTime(recorderState.durationMillis)}
      </Text>

      <Text style={styles.status}>
        {isRecording ? "Recording..." : "Ready to record"}
      </Text>

      <View style={styles.bottomControls}>
        <Pressable
          style={[
            styles.recordButton,
            isRecording && styles.stopButton,
          ]}
          onPress={
            isRecording
              ? stopRecording
              : startRecording
          }
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={36}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.instruction}>
          {isRecording
            ? "Tap to stop recording"
            : "Tap to start recording"}
        </Text>
      </View>
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

  timer: {
    color: "#60A5FA",
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 10,
  },

  waveform: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 100,
  },

  waveBar: {
    width: 2,
    backgroundColor: "#60A5FA",
    borderRadius: 4,
  },

  status: {
    color: "#94A3B8",
    fontSize: 16,
    marginTop: 25,
  },

  bottomControls: {
    position: "absolute",
    bottom: 35,
    alignItems: "center",
  },

  recordButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#60A5FA",
    alignItems: "center",
    justifyContent: "center",
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