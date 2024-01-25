import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';

const ProblemDetail = ({ route, navigation }) => {
  const [problems, setProblems] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { examDoc, answerDoc } = route.params;
  const [userChoices, setUserChoices] = useState({});

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const list = [];
        const problemCollection = collection(examDoc.ref, examDoc.id);
        const problemSnapshot = await getDocs(problemCollection);
        problemSnapshot.forEach((problemDoc) => {
          list.push({ id: problemDoc.id, data: problemDoc.data() });
        });
        setProblems(list);

        const alist = [];
        const answerCollection = collection(answerDoc.ref, answerDoc.id);
        const answerSnapshot = await getDocs(answerCollection);
        answerSnapshot.forEach((answerDoc) => {
          alist.push({ id: answerDoc.id, data: answerDoc.data() });
        });
        setAnswers(alist);

        const initialChoices = {};
        list.forEach((problem) => {
          initialChoices[problem.id] = 1;
        });
        setUserChoices(initialChoices);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    fetchProblems();
  }, [examDoc, answerDoc]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSelect = (number) => {
    setUserChoices((prevChoices) => ({
      ...prevChoices,
      [problems[currentIndex].id]: number,
    }));
  };

  const handleSubmit = () => {
    // userChoices를 PracticeResult 화면으로 전달
    Alert.alert('제출 확인', '답을 제출하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('취소를 누르셨습니다.'),
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () =>
          navigation.navigate('PracticeResult', {
            userChoices,
            problems,
            answers,
          }),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.idText}>{problems[currentIndex]?.id}</Text>
      {problems.length > 0 && (
        <ScrollView>
          {problems[currentIndex].data.img && (
            <Image
              style={styles.image}
              source={{ uri: problems[currentIndex].data.img }}
              resizeMode="contain"
            />
          )}
          <View style={styles.buttonContainer}>
            {[1, 2, 3, 4, 5].map((number) => (
              <TouchableOpacity
                key={number}
                style={
                  userChoices[problems[currentIndex].id] === number
                    ? styles.selectedButton
                    : styles.button
                }
                onPress={() => handleSelect(number)}
              >
                <Text style={styles.buttonText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      <View style={styles.controlButtonContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Text style={styles.controlButtonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleSubmit}>
          <Text style={styles.controlButtonText}>제출</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleNext}
          disabled={currentIndex === problems.length - 1}
        >
          <Text style={styles.controlButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  idText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 330,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  controlButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    backgroundColor: '#cddafd',
    padding: 10,
  },
  controlButtonText: {
    color: '#000',
  },
  button: {
    backgroundColor: '#946CEE',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#523383',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

export default ProblemDetail;
