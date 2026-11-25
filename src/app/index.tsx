import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Voice Journal</Text>

        <Text style={styles.subtitle}>
          Record and save your thoughts
        </Text>
      </View>

      <Pressable
        style={styles.recordButton}
        onPress={() => router.push("/recorder")}
      >
        <Ionicons name="mic" size={30} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1628",
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 30,
  },

  subtitle: {
    fontSize: 16,
    color: "#94A3B8",
    marginTop: 10,
  },

  recordButton: {
    position: "absolute",
    bottom: 30,
    right: 150,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#60A5FA",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});