import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigations';
import {color, font} from '../theme';
import {ms, mvs} from 'react-native-size-matters';
import {Button, Gap, InputText} from '../components';
import {LockIcon, UserIcon} from '../assets/icon';
import {widthResponsive, normalize} from '../utils';

export const LoginScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [focusInput, setFocusInput] = useState<'email' | 'password' | null>(
    null,
  );
  const [inputValue, setInputValue] = useState<string>('1234');
  const [passValue, setPassValue] = useState<string>('1234');
  const [isError, setIsError] = useState<boolean>(false);

  const handleOnLogin = () => {
    if (inputValue === '1234' && passValue === '1234') {
      navigation.replace('MainTab');
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleFocusInput = (focus: 'email' | 'password' | null) => {
    setFocusInput(focus);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{'Sign In'}</Text>
        </View>

        <View style={styles.body}>
          <View>
            <InputText
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={'Username..'}
              leftIcon={
                <UserIcon
                  stroke={color.Dark[50]}
                  style={{marginLeft: ms(-1), marginRight: ms(-5)}}
                />
              }
              onFocus={() => {
                handleFocusInput('email');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isError={false}
              errorMsg={''}
              isFocus={focusInput === 'email'}
            />
            <Gap height={8} />

            <InputText
              value={passValue}
              onChangeText={setPassValue}
              placeholder={'Password..'}
              leftIcon={<LockIcon stroke={color.Dark[50]} />}
              password
              isError={false}
              errorMsg={''}
              onFocus={() => {
                handleFocusInput('password');
              }}
              onBlur={() => {
                handleFocusInput(null);
              }}
              isFocus={focusInput === 'password'}
            />
            <Gap height={12} />
          </View>
          {isError && (
            <Text style={{color: color.Error[500], fontSize: mvs(16)}}>
              Wrong Pass Dude
            </Text>
          )}
          <Gap height={16} />
          <Button
            label={'Submit'}
            textStyles={{fontSize: mvs(14)}}
            containerStyles={{width: '100%'}}
            onPress={handleOnLogin}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.Dark[600],
  },
  titleContainer: {
    flex: 1,
    marginTop: widthResponsive(20),
  },
  titleStyle: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(30),
    textAlign: 'center',
    color: color.Neutral[10],
  },
  body: {
    flex: 2,
    padding: widthResponsive(20),
  },
  wrapperLoginType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: widthResponsive(16),
  },
  verticalSeparatorLoginType: {
    width: ms(1),
    height: mvs(12),
    backgroundColor: color.Dark[500],
    marginLeft: ms(12),
    marginRight: ms(12),
  },
  loginTypeActive: {
    fontFamily: font.InterMedium,
    fontSize: mvs(12),
    color: color.Pink[200],
    fontWeight: '500',
  },
  loginTypeInactive: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    color: color.Neutral[10],
    fontWeight: '400',
  },
  forgotPassStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(12),
  },
  descStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(12),
    maxWidth: '80%',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: color.Error[400],
    paddingVertical: mvs(16),
    paddingHorizontal: ms(12),
    borderRadius: 4,
    height: mvs(48),
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: mvs(22),
  },
  textStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: mvs(15),
  },
});
