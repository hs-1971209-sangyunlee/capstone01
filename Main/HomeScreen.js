import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
  Linking,
} from 'react-native'; // StyleSheet import 추가
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

const Achievement = 52;
const currentDate = new Date();
const testDate = new Date('2024-02-17');
const imageurl =
  'https://firebasestorage.googleapis.com/v0/b/capstone-ac206.appspot.com/o/%EB%B0%B0%EA%B2%BD.webp?alt=media&token=cabac6ad-77a8-4c88-9366-a33cd01c5bf6';
const timeDifference = testDate - currentDate;
const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

const LinkButtonPressed = () => {
  const examScheduleLink =
    'https://www.historyexam.go.kr/pageLink.do?link=examSchedule&netfunnel_key=E934081640D391F04FC56AC6C042B32037B017A93AECD22ED318655502C0D5E0FA9916BC7EEDE001B98B1F659245D8B5B481AF320FC49BDFDDA9E487CC5FA5E3C219884E7E69AE8FCA7EF380A6F8D3B91CF6BADBB12E604C00464C9F2FE9B694EE4301E896CCCBABBF1C7F32CA7A9D942C312C302C30';
  Linking.openURL(examScheduleLink).catch((err) =>
    console.error('링크를 여는 중 오류 발생:', err)
  );
};

const HomeScreen = ({ navigation }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userEmail = useSelector((state) => state.userEmail);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <MaterialIcons name="home" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source={{ uri: imageurl }} style={styles.image} />
      </View>
      <Text style={styles.title}>한국사 능력 검정 시험</Text>
      <Text style={{ fontSize: 15 }}>
        환영합니다.{' '}
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userEmail}</Text>님.
      </Text>
      <Text style={styles.achievementText}>달성도 {Achievement}%</Text>
      <StatusBar style="auto" />

      <View style={styles.horizontalLine}>
        <Text style={styles.gogo}>바로가기</Text>
      </View>

      <View style={styles.buttonttopContainer}>
        <TouchableOpacity
          style={styles.buttontop}
          onPress={() => navigation.navigate('기출문제')}
        >
          <Text style={styles.buttontopText}>기출문제 풀이</Text>
          <MaterialIcons name="format-list-numbered" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttontop}
          onPress={() => navigation.navigate('시대별 풀이')}
        >
          <Text style={styles.buttontopText}>시대별 풀이</Text>
          <MaterialIcons name="access-time-filled" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttontop}
          onPress={() => navigation.navigate('유형별 풀이')}
        >
          <Text style={styles.buttontopText}>유형별 풀이</Text>
          <MaterialIcons name="account-balance" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonboard}
          onPress={() => navigation.navigate('게시판')}
        >
          <Text style={styles.buttonboardText}>게시판 바로가기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalLine2}></View>

      <View style={styles.skyBlueBox}>
        <Text style={styles.dateText}>
          시험까지 {dayDifference}일 남았습니다.
        </Text>
        <Text style={styles.boxText}>
          시험일 : {testDate.getFullYear()}-{testDate.getMonth() + 1}-
          {testDate.getDate()}
        </Text>
        <TouchableOpacity style={styles.buttonLink} onPress={LinkButtonPressed}>
          <Text style={styles.buttonDateText}>시험 일정 확인하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginTop: 130, // 위쪽 여백 추가
  },
  horizontalLine2: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 20, // 수평선 위아래 간격 조절
    marginTop: 20, // 위쪽 여백 추가
  },
  gogo: {
    fontSize: 13,
    textAlign: 'center', // 가운데 정렬
    marginBottom: 10, // 원하는 간격으로 조절
  },
  buttonttopContainer: {
    flexDirection: 'row', // 수평으로 배치
    justifyContent: 'space-between', // 간격을 일정하게 분배
    marginTop: 5, // 위쪽 여백 추가
    alignItems: 'center', // 가운데 정렬
    justifyContent: 'center', // 가운데 정렬
  },
  buttontop: {
    backgroundColor: 'orange',
    borderRadius: 5,
    width: 120,
    height: 120,
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center', // 가운데 정렬
    justifyContent: 'center', // 가운데 정렬
  },
  buttonLink: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: 300,
    height: 40,
    marginLeft: 22,
    marginTop: 10,
    alignItems: 'center', // 가운데 정렬
    justifyContent: 'center', // 가운데 정렬
  },
  buttontopText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 20,
  },
  skyBlueBox: {
    backgroundColor: 'skyblue',
    width: 350,
    height: 140,
    borderRadius: 10, // 테두리를 둥글게 하는 속성 추가
  },
  boxText: {
    color: 'black',
    fontSize: 15,
    marginBottom: 10,
    marginTop: 6,
    marginLeft: 20,
  },
  dateText: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonDateText: {
    color: 'black',
    fontSize: 15,
  },
  buttonboard: {
    width: '100%',
    height: 50,
    backgroundColor: 'gray', // 버튼 배경색
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    borderRadius: 10, // 버튼 테두리 둥글게
    marginTop: 20, // 상단 여백 조절
  },
  buttonboardText: {
    color: 'white', // 버튼 텍스트 색상
    fontSize: 20, // 버튼 텍스트 크기
    fontWeight: 'bold', // 버튼 텍스트 굵기
  },
});

export default HomeScreen;
