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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#bbd2ec',
  },
  idText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    minHeight: 460,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  controlButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    backgroundColor: '#838abd',
    padding: 10,
    borderRadius: 5,
    width: 60,
  },
  controlButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    width: 60,
    height: 40,
    backgroundColor: '#4b3e9a',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedButton: {
    width: 60,
    height: 40,
    backgroundColor: '#523383',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  line: {
    borderBottomColor: '#838abd',
    borderBottomWidth: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
});

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

  const id = String(problems[currentIndex]?.id);
  const formattedId = `${id.slice(0, 2)}회차 ${parseInt(id.slice(2))}번`;

  return (
    <View style={styles.container}>
      <Text style={styles.idText}>{formattedId}</Text>
      <View style={styles.line} />
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

export default ProblemDetail;
