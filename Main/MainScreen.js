import React from 'react';
import { StatusBar, Image, Linking } from 'react-native'; // Image 및 Linking 추가
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const name = 'woo';
const Achievement = 52;
const currentDate = new Date();
const testDate = new Date('2024-02-17');
const Link =
  'https://www.historyexam.go.kr/pageLink.do?link=examSchedule&netfunnel_key=E934081640D391F04FC56AC6C042B32037B017A93AECD22ED318655502C0D5E0FA9916BC7EEDE001B98B1F659245D8B5B481AF320FC49BDFDDA9E487CC5FA5E3C219884E7E69AE8FCA7EF380A6F8D3B91CF6BADBB12E604C00464C9F2FE9B694EE4301E896CCCBABBF1C7F32CA7A9D942C312C302C30';
//한능검 링크
const imageurl =
  'https://firebasestorage.googleapis.com/v0/b/capstone-ac206.appspot.com/o/%EB%B0%B0%EA%B2%BD.webp?alt=media&token=cabac6ad-77a8-4c88-9366-a33cd01c5bf6';
const timeDifference = testDate - currentDate;
const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
//날짜 구하기
const Stack = createStackNavigator();

const handleButtonPress = () => {
  console.log(`두 날짜 간의 차이: ${dayDifference} 일`);
};

const LinkButtonPressed = () => {
  const examScheduleLink =
    'https://www.historyexam.go.kr/pageLink.do?link=examSchedule&netfunnel_key=E934081640D391F04FC56AC6C042B32037B017A93AECD22ED318655502C0D5E0FA9916BC7EEDE001B98B1F659245D8B5B481AF320FC49BDFDDA9E487CC5FA5E3C219884E7E69AE8FCA7EF380A6F8D3B91CF6BADBB12E604C00464C9F2FE9B694EE4301E896CCCBABBF1C7F32CA7A9D942C312C302C30';

  Linking.openURL(examScheduleLink).catch((err) =>
    console.error('링크를 여는 중 오류 발생:', err)
  );
};

const MainScreen = ({ navigation }) => {
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imagecontainer}>
          <Image source={{ uri: imageurl }} style={styles.image} />
        </View>
        <Text style={styles.title}>한국사 능력 검정 시험</Text>
        <Text>환영합니다. {name}님.</Text>
        <Text style={styles.achievementText}>달성도 {Achievement}%</Text>
        <StatusBar style="auto" />

        <View style={styles.horizontalLine}>
          <Text style={styles.gogo}>바로가기</Text>
        </View>

        <View style={styles.buttonttopContainer}>
          <TouchableOpacity
            style={styles.buttontop}
            onPress={() => navigation.navigate('PracticeRoundSelect')}
          >
            <Text style={styles.buttontopText}>기출문제 풀이</Text>
            <MaterialIcons
              name="format-list-numbered"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttontop}>
            <Text style={styles.buttontopText}>유형별 풀이</Text>
            <MaterialIcons name="account-balance" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonmiddleContainer}>
          <TouchableOpacity style={styles.buttonmid}>
            <Text style={styles.buttonmidText}>킬러문제</Text>
            <MaterialIcons name="do-not-disturb-on" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonmid}>
            <Text style={styles.buttonmidText}>오답노트</Text>
            <MaterialIcons name="menu-book" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonmid}>
            <Text style={styles.buttonmidText}>플래너</Text>
            <MaterialIcons name="timer" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonmiddleContainer}>
          <TouchableOpacity
            style={styles.buttonmid}
            onPress={() => navigation.navigate('BoardScreen')}
          >
            <Text style={styles.buttonmidText}>게시판</Text>
            <MaterialIcons name="speaker-notes" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonmid}>
            <Text style={styles.buttonmidText}>통계</Text>
            <MaterialIcons name="auto-graph" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonmid}
            onPress={() => navigation.navigate('QuizGame')}
          >
            <Text style={styles.buttonmidText}>게임</Text>
            <MaterialIcons
              name="check-circle-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonmid}>
            <Text style={styles.buttonhistoryText}>역사이야기</Text>
            <MaterialIcons name="play-circle-filled" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine}></View>

        <View style={styles.skyBlueBox}>
          <Text style={styles.boxText}>다음 시험까지...</Text>
          <Text style={styles.dateText}>{dayDifference}일 남았습니다.</Text>
          <Text style={styles.boxText}>
            시험일 : {testDate.getFullYear()}-{testDate.getMonth() + 1}-
            {testDate.getDate()}
          </Text>
          <TouchableOpacity
            style={styles.buttonLink}
            onPress={LinkButtonPressed}
          >
            <Text style={styles.buttonDateText}>시험 일정 확인하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default MainScreen;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  imagecontainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 330,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  achievementText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right', // 오른쪽 맞춤
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 20, // 수평선 위아래 간격 조절
    marginTop: 250, // 위쪽 여백 추가
  },
  gogo: {
    fontSize: 13,
    textAlign: 'center', // 가운데 정렬
    marginBottom: 10, // 원하는 간격으로 조절
  },
  buttonttopContainer: {
    flexDirection: 'row', // 수평으로 배치
    justifyContent: 'space-between', // 간격을 일정하게 분배
    marginHorizontal: 20, // 양 옆 간격 추가
    marginTop: 20, // 위쪽 여백 추가
  },
  buttonmiddleContainer: {
    flexDirection: 'row', // 수평으로 배치
    justifyContent: 'space-between', // 간격을 일정하게 분배
    marginHorizontal: 10, // 양 옆 간격 추가
    marginTop: 50, // 위쪽 여백 추가
  },
  buttontop: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    width: 120,
    height: 120,
    alignItems: 'center', // 가운데 정렬
    justifyContent: 'center', // 가운데 정렬
  },
  buttonmid: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    width: 80,
    height: 80,
    alignItems: 'center', // 가운데 정렬
    justifyContent: 'center', // 가운데 정렬
  },
  buttonLink: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: 300,
    height: 50,
    marginLeft: 22,
    marginTop: 15,
    alignItems: 'center', // 가운데 정렬
    justifyContent: 'center', // 가운데 정렬
  },
  buttontopText: {
    color: 'white',
    fontSize: 17,
    marginBottom: 20,
  },
  buttonmidText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
  },
  buttonhistoryText: {
    color: 'white',
    fontSize: 13,
    marginBottom: 10,
  },
  skyBlueBox: {
    backgroundColor: 'skyblue',
    width: 350,
    height: 200,
    borderRadius: 10, // 테두리를 둥글게 하는 속성 추가
  },
  boxText: {
    color: 'black',
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  dateText: {
    color: 'black',
    fontSize: 30,
    marginLeft: 20,
  },
  buttonDateText: {
    color: 'black',
    fontSize: 15,
  },
});
