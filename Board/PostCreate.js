import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { database } from '../firebaseConfig';
import { ref, set } from 'firebase/database';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  contentInput: {
    height: 200,
    marginBottom: 10,
  },
});
// 게시판 글 생성 화면
const PostCreate = ({ route, navigation }) => {
  const { boardName } = route.params;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    const postRef = ref(database, boardName + '/' + Date.now());

    set(postRef, {
      title: title,
      body: body,
    })
      .then(() => {
        console.log('Data updated successfully.');
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Data could not be saved.' + error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="제목"
        value={title}
        onChangeText={(text) => setTitle(text)} // 제목을 입력할 때마다 state 업데이트
        style={styles.input}
      />
      <TextInput
        label="내용"
        multiline
        numberOfLines={10}
        textAlignVertical="top"
        value={body}
        onChangeText={(text) => setBody(text)} // 내용을 입력할 때마다 state 업데이트
        style={styles.contentInput}
      />
      <Button mode="contained" onPress={handleSubmit}>
        등록
      </Button>
    </View>
  );
};

export default PostCreate;
