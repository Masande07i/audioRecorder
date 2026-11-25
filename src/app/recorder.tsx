import { StyleSheet, Text, View } from "react-native";

export default function RecorderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Voice Note</Text>

      <Text style={styles.timer}>00:00</Text>

      <Text style={styles.status}>Ready to record</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1628",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 50,
  },

  timer: {
    color: "#60A5FA",
    fontSize: 48,
    fontWeight: "bold",
  },

  status: {
    color: "#94A3B8",
    fontSize: 16,
    marginTop: 15,
  },
});