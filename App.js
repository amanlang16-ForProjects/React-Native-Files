import React, { useState } from "react";
import {View, Text, TextInput, FlatList, Pressable, Alert, StyleSheet} from "react-native";

export default function App() {
  const [enteredNoteText, setEnteredNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  function noteInputHandler(text) {
    setEnteredNoteText(text);
  }
  function addNoteHandler() {
    if (!enteredNoteText.trim()) return;
    setNotes((currentNotes) => [
      ...currentNotes,
      { id: Math.random().toString(), text: enteredNoteText },
    ]);
    setEnteredNoteText("");
  }
  function openNoteHandler(id) {
    const noteToEdit = notes.find((note) => note.id === id);
    if (!noteToEdit) return;
    setSelectedNoteId(id);
    setEnteredNoteText(noteToEdit.text);
  }
  function updateNoteHandler() {
    if (!enteredNoteText.trim()) return;
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedNoteId
          ? { ...note, text: enteredNoteText }
          : note
      )
    );
    setSelectedNoteId(null);
    setEnteredNoteText("");
  }
  function cancelEditHandler() {
    setSelectedNoteId(null);
    setEnteredNoteText("");
  }
  function confirmDeleteHandler(id) {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteNoteHandler(id),


        },
      ]
    );
  }
  function deleteNoteHandler(id) {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    );
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
      setEnteredNoteText("");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Note pad</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Type here"
          style={styles.input}
          onChangeText={noteInputHandler}
          value={enteredNoteText}/>

        {!selectedNoteId && (
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed,
            ]}
            onPress={addNoteHandler}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        )}
      </View>

      {selectedNoteId ? (
        <View style={styles.buttonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.updateButton,
              pressed && styles.pressed,
            ]}
            onPress={updateNoteHandler}>
            <Text style={styles.buttonText}>Update</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.pressed,
            ]}
            onPress={cancelEditHandler}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      ) : null}

      <Text style={styles.notesHeader}>Notes:</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openNoteHandler(item.id)}
            onLongPress={() => confirmDeleteHandler(item.id)}
            delayLongPress={350}
            style={({ pressed }) => [
              styles.noteItem,
              pressed && styles.pressedItem,
            ]}>
            <Text style={styles.noteText}>{item.text}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#c0c0c0",
    borderRadius: 8,
    padding: 12,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#010101b4",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButton: {
    backgroundColor: "#010101b4",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "#010101b4",
    padding: 12,
    borderRadius: 15
  ,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  notesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  noteItem: {
    backgroundColor: "#f5f4f4",
    borderWidth: 1,
    borderColor: "#d6d6d6",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  pressedItem: {
    backgroundColor: "#ddd",
  },
});