import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const initialMessages = {
  Family: {
    Mom: [
      { id: '1', sender: 'Mom', time: '2025-05-20 13:45', content: 'Don’t forget to call your aunt!', read: false, replyText: '', showReplyInput: false },
      { id: '2', sender: 'Mom', time: '2025-05-20 16:00', content: 'Dinner is at 7 PM.', read: true, replyText: '', showReplyInput: false },
      { id: '3', sender: 'Mom', time: '2025-05-21 08:15', content: 'How was your class?', read: false, replyText: '', showReplyInput: false },
    ],
    Dad: [
      { id: '4', sender: 'Dad', time: '2025-05-20 14:30', content: 'Check the car oil.', read: false, replyText: '', showReplyInput: false },
      { id: '5', sender: 'Dad', time: '2025-05-21 09:00', content: 'Don’t forget the groceries.', read: false, replyText: '', showReplyInput: false },
    ],
    Sister: [
      { id: '6', sender: 'Sister', time: '2025-05-20 15:15', content: 'Let’s go shopping this weekend.', read: false, replyText: '', showReplyInput: false },
      { id: '7', sender: 'Sister', time: '2025-05-21 10:20', content: 'Can you help me with homework?', read: false, replyText: '', showReplyInput: false },
    ],
  },
  Friends: {
    John: [
      { id: '8', sender: 'John', time: '2025-05-20 14:00', content: 'Want to grab coffee tomorrow?', read: true, replyText: '', showReplyInput: false },
      { id: '9', sender: 'John', time: '2025-05-21 09:30', content: 'Did you watch the game?', read: false, replyText: '', showReplyInput: false },
    ],
    Emma: [
      { id: '10', sender: 'Emma', time: '2025-05-20 14:45', content: 'Let’s catch up soon!', read: false, replyText: '', showReplyInput: false },
      { id: '11', sender: 'Emma', time: '2025-05-21 10:00', content: 'Happy birthday!', read: true, replyText: '', showReplyInput: false },
    ],
    Liam: [
      { id: '12', sender: 'Liam', time: '2025-05-20 13:20', content: 'Game night this Friday?', read: false, replyText: '', showReplyInput: false },
      { id: '13', sender: 'Liam', time: '2025-05-21 11:00', content: 'Don’t forget the snacks.', read: false, replyText: '', showReplyInput: false },
    ],
  },
  Colleagues: {
    Alice: [
      { id: '14', sender: 'Alice', time: '2025-05-20 15:00', content: 'Please review the latest report.', read: false, replyText: '', showReplyInput: false },
      { id: '15', sender: 'Alice', time: '2025-05-21 08:45', content: 'Meeting rescheduled to 2 PM.', read: true, replyText: '', showReplyInput: false },
    ],
    Bob: [
      { id: '16', sender: 'Bob', time: '2025-05-20 12:30', content: 'Don’t forget to submit the invoice.', read: true, replyText: '', showReplyInput: false },
      { id: '17', sender: 'Bob', time: '2025-05-21 09:15', content: 'Can we talk before the meeting?', read: false, replyText: '', showReplyInput: false },
    ],
    Charlie: [
      { id: '18', sender: 'Charlie', time: '2025-05-20 09:00', content: 'Nice work on the project!', read: false, replyText: '', showReplyInput: false },
      { id: '19', sender: 'Charlie', time: '2025-05-21 10:30', content: 'Let’s grab lunch today.', read: false, replyText: '', showReplyInput: false },
    ],
  },
  Agents: {
    AgentSmith: [
      { id: '20', sender: 'AgentSmith', time: '2025-05-20 14:00', content: 'Your case is under review.', read: true, replyText: '', showReplyInput: false },
    ],
    AgentJones: [
      { id: '21', sender: 'AgentJones', time: '2025-05-21 08:00', content: 'Documents have been sent.', read: false, replyText: '', showReplyInput: false },
    ],
    AgentBrown: [],
  },
  Strangers: {
    Unknown1: [
      { id: '22', sender: 'Unknown1', time: '2025-05-21 13:00', content: 'Who is this?', read: false, replyText: '', showReplyInput: false },
    ],
    Unknown2: [],
    Unknown3: [],
  },
};

const HomeScreen = ({ navigation }) => {
  const [groupData, setGroupData] = useState(initialMessages);
  const [search, setSearch] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [editingGroup, setEditingGroup] = useState(null);
  const [editedGroupName, setEditedGroupName] = useState('');

  const addGroup = () => {
    if (!newGroup.trim() || groupData[newGroup]) return;
    setGroupData({ ...groupData, [newGroup]: {} });
    setNewGroup('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inbox Groups</Text>
      <TextInput placeholder="Search Groups" value={search} onChangeText={setSearch} style={styles.input} />

      <View style={styles.row}>
        <TextInput placeholder="New Group Name" value={newGroup} onChangeText={setNewGroup} style={[styles.input, { flex: 1 }]} />
        <TouchableOpacity style={styles.addButton} onPress={addGroup}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {Object.keys(groupData)
        .filter((group) => group.toLowerCase().includes(search.toLowerCase()))
        .map((group) => {
          const isEditing = editingGroup === group;
          return (
            <View key={group} style={[styles.groupCard, { backgroundColor: groupColors[group] || '#fff' }]}>
              {isEditing ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editedGroupName}
                    onChangeText={setEditedGroupName}
                    placeholder="Edit Group Name"
                  />
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                      if (!editedGroupName.trim()) return;
                      const updated = { ...groupData };
                      updated[editedGroupName] = updated[group];
                      delete updated[group];
                      setGroupData(updated);
                      setEditingGroup(null);
                      setEditedGroupName('');
                    }}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.groupButton}
                    onPress={() =>
                      navigation.navigate('Contacts', {
                        category: group,
                        contacts: groupData[group],
                        setGroupData,
                        groupData,
                      })
                    }
                  >
                    <Text style={styles.groupText}>{group}</Text>
                  </TouchableOpacity>
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        setEditingGroup(group);
                        setEditedGroupName(group);
                      }}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => {
                        const updated = { ...groupData };
                        delete updated[group];
                        setGroupData(updated);
                      }}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          );
        })}
    </ScrollView>
  );
};

const ContactsScreen = ({ route, navigation }) => {
  const { category, contacts, setGroupData, groupData } = route.params;
  const [newContact, setNewContact] = useState('');

  const addContact = () => {
    if (!newContact.trim() || contacts[newContact]) return;
    const updated = { ...contacts, [newContact]: [] };
    setGroupData({ ...groupData, [category]: updated });
    setNewContact('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{category} Contacts</Text>
      <TextInput placeholder="New Contact Name" value={newContact} onChangeText={setNewContact} style={styles.input} />
      <Button title="Add Contact" onPress={addContact} />
      {Object.keys(contacts).map((contact, i) => (
        <TouchableOpacity
          key={contact}
          style={[styles.button, { backgroundColor: contactColors[i % contactColors.length] }]}
          onPress={() =>
            navigation.navigate('Messages', {
              contact,
              messages: contacts[contact],
            })
          }
        >
          <Text style={styles.groupText}>{contact}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const MessagesScreen = ({ route }) => {
  const { contact, messages: initialMessages } = route.params;
  const [messages, setMessages] = useState(initialMessages);

  const updateMessageField = (id, field, value) => {
    setMessages((msgs) => msgs.map((msg) => (msg.id === id ? { ...msg, [field]: value } : msg)));
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{contact}'s Messages</Text>
      {messages.map((item) => (
        <View key={item.id} style={styles.groupCard}>
          <Text style={styles.groupText}>From: {item.sender}</Text>
          <Text>Time: {item.time}</Text>
          <Text>{item.content}</Text>
          <Text>Status: {item.read ? 'Read' : 'Unread'}</Text>
          {item.replyText ? <Text>Your reply: {item.replyText}</Text> : null}
          <View style={styles.actionRow}>
            <Button
              title={item.read ? 'Mark as Unread' : 'Mark as Read'}
              onPress={() => updateMessageField(item.id, 'read', !item.read)}
            />
            <Button
              title={item.showReplyInput ? 'Cancel' : 'Reply'}
              onPress={() => updateMessageField(item.id, 'showReplyInput', !item.showReplyInput)}
            />
            <Button title="Delete" color="red" onPress={() => deleteMessage(item.id)} />
          </View>
          {item.showReplyInput && (
            <TextInput
              style={styles.input}
              placeholder="Type your reply here"
              onSubmitEditing={(e) => {
                updateMessageField(item.id, 'replyText', e.nativeEvent.text);
                updateMessageField(item.id, 'showReplyInput', false);
              }}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inbox" component={HomeScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const groupColors = {
  Family: '#FFEBEE',
  Friends: '#E3F2FD',
  Colleagues: '#E8F5E9',
  Agents: '#FFF8E1',
  Strangers: '#F3E5F5',
};

const contactColors = [
  '#FFF3E0', '#E1F5FE', '#E8F5E9', '#FCE4EC', '#F3E5F5', '#FFFDE7'
];

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  groupButton: { paddingVertical: 10 },
  groupText: { fontSize: 18, fontWeight: '500' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  editButton: { backgroundColor: '#2196F3', padding: 10, borderRadius: 8 },
  deleteButton: { backgroundColor: '#f44336', padding: 10, borderRadius: 8 },
  saveButton: { backgroundColor: '#673AB7', padding: 10, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  button: { backgroundColor: '#ddd', padding: 10, marginVertical: 5, borderRadius: 8, alignItems: 'center' },
});
