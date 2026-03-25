import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ImageBackground,
} from "react-native";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  const selectNote = (index) => {
    setNote(notes[index]);
    setSelectedIndex(index);
    setEditMode(true);
  };

  const updateNote = () => {
    const updatedNotes = [...notes];
    updatedNotes[selectedIndex] = note;
    setNotes(updatedNotes);
    setNote("");
    setEditMode(false);
  };

  const cancelEdit = () => {
    setNote("");
    setEditMode(false);
  };

  const openDeleteModal = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const deleteNote = () => {
    const newNotes = notes.filter((_, i) => i !== selectedIndex);
    setNotes(newNotes);
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("./assets/Facebook.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>My Notes</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputInline}
            placeholder={editMode ? "Edit your note..." : "Write your note..."}
            placeholderTextColor="#ccc"
            value={note}
            onChangeText={setNote}
          />
          {editMode ? (
            <View style={styles.editButtonsColumn}>
              <TouchableOpacity
                style={styles.updateBtnInline}
                onPress={updateNote}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtnInline}
                onPress={cancelEdit}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButtonInline}
              onPress={addNote}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.noteCard}
              onPress={() => selectNote(index)}
              onLongPress={() => openDeleteModal(index)}
            >
              <Text style={styles.noteText}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal transparent animationType="fade" visible={modalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Delete Note</Text>

              <Text style={styles.modalText}>
                Are you sure you want to delete this note?
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalDelete}
                  onPress={deleteNote}
                >
                  <Text style={styles.modalDeleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    padding: 25,
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    color: "#a9a5bcdd",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  // Input + Buttons
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  inputInline: {
    flex: 1,
    backgroundColor: "#a9c4ef30",
    padding: 14,
    borderRadius: 10,
    color: "white",
    fontSize: 16,
    fontFamily: "Times New Roman",
    marginRight: 10,
  },

  addButtonInline: {
    backgroundColor: "#1541869e",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  editButtonsColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  updateBtnInline: {
    backgroundColor: "#1541869e",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
  },

  cancelBtnInline: {
    backgroundColor: "#475569",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Times New Roman",
  },

  noteCard: {
    backgroundColor: "rgba(103, 69, 121, 0.42)",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },

  noteText: {
    color: "#e2e8f0",
    fontSize: 16,
    fontFamily: "Times New Roman",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: 300,
    backgroundColor: "#55386583",
    padding: 25,
    borderRadius: 12,
  },

  modalTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    fontFamily: "Times New Roman",
  },

  modalText: {
    color: "#ced6e2",
    marginBottom: 20,
    fontFamily: "Times New Roman",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalCancel: {
    padding: 10,
  },

  modalCancelText: {
    color: "#dee6f0",
    fontFamily: "Times New Roman",
  },

  modalDelete: {
    padding: 10,
  },

  modalDeleteText: {
    color: "#ef4444",
    fontFamily: "Times New Roman",
  },
});