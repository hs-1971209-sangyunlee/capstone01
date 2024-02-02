import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './Main/MainScreen';
import BoardScreen from './Board/BoardScreen';
import PracticeRoundSelect from './Practice/PracticeRoundSelect';
import ProblemDetail from './Practice/ProblemDetail';
import PracticeResult from './Practice/PracticeResult';
import ProblemCommentary from './Practice/ProblemCommentary';
import QuizGame from './Game/QuizGame';
import UnsolvedScreen from './Game/UnsolvedScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BoardScreen"
          component={BoardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PracticeRoundSelect"
          component={PracticeRoundSelect}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProblemDetail"
          component={ProblemDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PracticeResult"
          component={PracticeResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProblemCommentary"
          component={ProblemCommentary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuizGame"
          component={QuizGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UnsolvedScreen"
          component={UnsolvedScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
