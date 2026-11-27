import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VoiceNote } from "../types/voiceNote";

export default function HomeScreen() {
  const router = useRouter();
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);

  const loadVoiceNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("voiceNotes");

      if (savedNotes) {
        setVoiceNotes(JSON.parse(savedNotes));
      } else {
        setVoiceNotes([]);
      }
    } catch (error) {
      console.log("Error loading voice notes:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadVoiceNotes();
    }, [])
  );

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const renderVoiceNote = ({ item }: { item: VoiceNote }) => {
    return (
      <View style={styles.noteCard}>
        <View style={styles.noteIcon}>
          <Ionicons
            name="mic"
            size={22}
            color="#60A5FA"
          />
        </View>

        <View style={styles.noteInfo}>
          <Text style={styles.noteName}>
            {item.name}
          </Text>

          <Text style={styles.noteDetails}>
            {formatDate(item.createdAt)} •{" "}
            {formatTime(item.duration)}
          </Text>
        </View>

        <Pressable style={styles.playButton}>
          <Ionicons
            name="play"
            size={20}
            color="#FFFFFF"
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Journal</Text>

      <Text style={styles.subtitle}>
        Record and save your thoughts
      </Text>

      {voiceNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="mic-outline"
            size={50}
            color="#475569"
          />

          <Text style={styles.emptyTitle}>
            No voice notes yet
          </Text>

          <Text style={styles.emptyText}>
            Tap the microphone to record your first voice note.
          </Text>
        </View>
      ) : (
        <FlatList
          data={voiceNotes}
          keyExtractor={(item) => item.id}
          renderItem={renderVoiceNote}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Pressable
        style={styles.recordButton}
        onPress={() => router.push("/recorder")}
      >
        <Ionicons
          name="mic"
          size={30}
          color="#FFFFFF"
        />
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

  list: {
    paddingTop: 30,
    paddingBottom: 100,
  },

  noteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111F33",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  noteIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#172A44",
    alignItems: "center",
    justifyContent: "center",
  },

  noteInfo: {
    flex: 1,
    marginLeft: 14,
  },

  noteName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  noteDetails: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 5,
  },

  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#60A5FA",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
  },

  emptyText: {
    color: "#94A3B8",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 280,
    lineHeight: 20,
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