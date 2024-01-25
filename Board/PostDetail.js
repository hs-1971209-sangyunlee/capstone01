import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import { database } from '../firebaseConfig';
import { ref, set, onValue, off } from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    backgroundColor: '#bbd2ec',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
  },
  contentText: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#dfe9f5',
    minHeight: 405,
    borderRadius: 20,
  },
  writeButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#E6E6FA',
    borderColor: '#4b3e9a',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 30,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 30,
  },
  card: {
    margin: 5,
    minHeight: 50,
    fontSize: 20,
  },
  line: {
    borderBottomColor: '#7bb4e3',
    borderBottomWidth: 10,
    margin: 10,
    borderRadius: 5,
  },
});
// 게시판 글 클릭했을 때 내용 보이는 화면
const PostDetail = ({ route, navigation }) => {
  const { post, boardName } = route.params;
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    // 댓글 가져오기
    const commentsRef = ref(database, boardName + '/' + post.id + '/comments');
    const listener = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const comments = Object.keys(data).map((key) => ({
          id: key,
          comment: data[key].comment,
        }));
        setCommentList(comments);
      }
    });

    return () => {
      off(commentsRef, listener);
    };
  }, []);
  const scrollViewRef = useRef();
  const handleSubmit = () => {
    // 댓글 저장
    if (comment.trim() === '') {
      // 댓글 내용이 없으면 저장하지 않음
      return;
    }
    const postRef = ref(
      database,
      boardName + '/' + post.id + '/' + 'comments/' + Date.now()
    );

    set(postRef, {
      comment: comment,
    })
      .then(() => {
        console.log('Data updated successfully.');
        scrollViewRef.current.scrollToEnd({ animated: true }); // 화면 최하단으로 스크롤 이동
      })
      .catch((error) => {
        console.error('Data could not be saved.' + error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.contentText}>{post.body}</Text>
        </View>

        {commentList.length > 0 && <View style={styles.line} />}

        {commentList.length > 0 &&
          commentList.map((item, index) => (
            <Card key={item.id} style={styles.card}>
              <Card.Content>
                <Text>{item.comment}</Text>
              </Card.Content>
            </Card>
          ))}

        {commentList.length > 0 && <View style={styles.line} />}

        <View style={styles.inputRow}>
          <TextInput // 댓글 입력창
            style={styles.commentInput}
            placeholder="댓글 작성하기"
            onChangeText={(text) => setComment(text)} // 입력값을 상태로 관리
            value={comment}
          />
          <TouchableOpacity style={styles.writeButton} onPress={handleSubmit}>
            <Icon name="comment" size={24} color="#35439c" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PostDetail;
