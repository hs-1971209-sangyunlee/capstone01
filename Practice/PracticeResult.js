import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
  },
  number: {
    width: '10%',
  },
  userChoice: {
    width: '30%',
  },
  correctChoice: {
    color: 'blue',
  },
  incorrectChoice: {
    color: 'red',
  },
  answer: {
    width: '30%',
    color: 'blue',
  },
  explanationButton: {
    width: '20%',
  },
  score: {
    marginTop: 20,
    fontSize: 20,
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

const PracticeResult = ({ route, navigation }) => {
  const { userChoices, problems, answers } = route.params;
  const choicesArray = Object.entries(userChoices);

  let totalScore = 100;
  let wrongIndexes = new Array(choicesArray.length).fill(1);
  choicesArray.forEach(([index, value], i) => {
    const answer = answers.find((answer) => answer.id === index);
    const problem = problems.find((problem) => problem.id === index);
    if (answer && problem && value != answer.data.answer) {
      totalScore -= problem.data.score;
      wrongIndexes[i] = 0;
    }
  });

  const handleCommentary = (index) => {
    const answer = answers.find((answer) => answer.id === index);
    const problem = problems.find((problem) => problem.id === index);
    navigation.navigate('ProblemCommentary', {
      problem: problem,
      answer: answer,
    });
  };
  const renderItem = ({ item }) => {
    const [index, value] = item;
    const answer = answers.find((answer) => answer.id === index);
    return (
      <Card style={styles.card}>
        <View style={styles.listItem}>
          <View style={{ flexDirection: 'row', flex: 0.9 }}>
            <Text style={styles.number}>{`${parseInt(
              index.slice(-2)
            )}번`}</Text>
            <Text
              style={[
                styles.userChoice,
                wrongIndexes[parseInt(index.slice(-2)) - 1]
                  ? styles.correctChoice
                  : styles.incorrectChoice,
              ]}
            >
              {`선택: ${value}`}
            </Text>
            <Text style={styles.answer}>{`정답: ${
              answer ? answer.data.answer : '정답 정보 없음'
            }`}</Text>
          </View>
          <Button
            style={styles.explanationButton}
            title="해설"
            onPress={() => handleCommentary(index)}
          />
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>채점 결과</Text>
      <FlatList
        data={choicesArray}
        renderItem={renderItem}
        keyExtractor={(item) => item[0]}
      />
      <View>
        <Text style={styles.score}>총점: {totalScore}</Text>
      </View>
    </View>
  );
};

export default PracticeResult;
