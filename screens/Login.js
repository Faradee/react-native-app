import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import * as api from '../api';
import * as Keychain from 'react-native-keychain';
import userIcon from 'react-native-vector-icons/dist/AntDesign';
import lockIcon from 'react-native-vector-icons/dist/Entypo';
import CustomInput from '../components/CustomInput';
import {NavigationActions} from 'react-navigation';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../store/userSlice';

const Login = ({isLoading, setLoading}) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isSignup, setSignup] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const setErrorText = text => {
    setError(text);
    setLoading(false);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const user = {password, email};
    if (isSignup) user.username = username;
    else user.login = username;
    if (
      (isSignup && (!username || !password || !confirmPassword || !email)) ||
      (!isSignup && (!username || !password))
    )
      setErrorText('Invalid form');
    else if (isSignup && password != confirmPassword)
      setErrorText("Password don't match");
    else {
      setError(null);
      try {
        const {data} = await (isSignup ? api.signUp(user) : api.logIn(user));
        console.log(data)
        dispatch(setUser(data));
        navigation.navigate('Notes');
        setLoading(false);
      } catch (err) {
        console.log(err);
      }

    }
  };

  const toggleSingup = () => {
    setSignup(!isSignup);
    setError(null);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomInput
        value={username}
        Icon={userIcon}
        setValue={setUsername}
        placeholder="Username"
      />
      <CustomInput
        value={password}
        Icon={lockIcon}
        setValue={setPassword}
        secure={true}
        placeholder="Password"
      />
      {error ? (
        <>
          <Text style={styles.error}>{error}</Text>
        </>
      ) : null}

      {isSignup ? (
        <>
          <CustomInput
            value={confirmPassword}
            Icon={lockIcon}
            setValue={setConfirmPassword}
            secure={true}
            placeholder="Confirm Password"
          />
          <CustomInput
            value={email}
            Icon={lockIcon}
            setValue={setEmail}
            placeholder="Email"
          />
        </>
      ) : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleSingup}>
          <Text>{isSignup ? 'Log In' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginRight: 20,
    padding: 10,
    backgroundColor: '#add8e6',
    width: '40%',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
});

export default Login;
