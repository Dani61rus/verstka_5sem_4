import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const commentRef = useRef();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Введите имя";
    } else if (name.trim().length < 2) {
      newErrors.name = "Имя должно быть не ме 2 символа";
    }

    const emailTrim = email.trim();
    if (!emailTrim) {
      newErrors.email = "Email не может быть пустым";
    } else if (!/\S+@\S+\.\S+/.test(emailTrim)) {
      newErrors.email = "Введите корректный email";
    }

    if (!password) {
      newErrors.password = "Пароль не может быть пустым";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен быть минимум 6 символов";
    }

    if (comment.length > 200) {
      newErrors.comment = "Комментарий не может быть длиннее 200 символов";
    }

    setErrors(newErrors);
    return newErrors;
  };

  useEffect(() => {
    validate();
  }, [name, email, password, comment]);

  const handleRegister = () => {
    const newErrors = validate();
    const hasErrors = Object.keys(newErrors).length > 0;

    if (!hasErrors) {
      Alert.alert(
        "Регистрация успешна",
        `Имя: ${name.trim()}\nEmail: ${email.trim()}\nПароль: ${password}\nПодписка: ${subscribe ? "Да" : "Нет"}\nКомментарий: ${comment}`
      );

      // очистка формы
      setName("");
      setEmail("");
      setPassword("");
      setSubscribe(false);
      setComment("");
      setErrors({});
    } else {
      if (newErrors.name) {
        nameRef.current && nameRef.current.focus();
      } else if (newErrors.email) {
        emailRef.current && emailRef.current.focus();
      } else if (newErrors.password) {
        passwordRef.current && passwordRef.current.focus();
      } else if (newErrors.comment) {
        commentRef.current && commentRef.current.focus();
      }

      Alert.alert("Ошибка", "Проверьте правильность заполнения полей");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Форма регистрации</Text>

        <TextInput
          ref={nameRef}
          style={styles.input}
          placeholder="Имя"
          value={name}
          onChangeText={setName}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
          blurOnSubmit={false}
          accessible
          accessibilityLabel="Поле имя"
          importantForAutofill="yes"
          autoComplete="name"
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <TextInput
          ref={emailRef}
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
          blurOnSubmit={false}
          accessible
          accessibilityLabel="Поле email"
          importantForAutofill="yes"
          autoComplete="email"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          returnKeyType="next"
          onSubmitEditing={() => commentRef.current && commentRef.current.focus()}
          blurOnSubmit={false}
          accessible
          accessibilityLabel="Поле пароль"
          importantForAutofill="yes"
          autoComplete="password"
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Подписка на новости:</Text>
          <Switch 
          value={subscribe} 
          onValueChange={setSubscribe}
            trackColor={{ false: "#767577", true: "#9FC5FF" }}
            thumbColor={subscribe ? "#3686FF" : "#f4f4f4"}
            ios_backgroundColor="#f4f4f4"
          />
        </View>

        <TextInput
          ref={commentRef}
          style={[styles.input, styles.commentInput]}
          placeholder="Комментарий"
          value={comment}
          onChangeText={setComment}
          multiline={true}
          numberOfLines={4}
          maxLength={200}
          textAlignVertical="top"
          accessible
          accessibilityLabel="Поле комментарий"
        />
        <Text style={styles.charCount}>{comment.length}/200</Text>
        {errors.comment && <Text style={styles.error}>{errors.comment}</Text>}

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleRegister}
          accessibilityRole="button"
          accessibilityLabel="Зарегистрироваться"
        >
          <Text style={styles.buttonText}>Зарегистрироваться</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "stretch",
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#ececec",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#363affff",
    backgroundColor: "#daddffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentInput: {
    height: 120,
    paddingTop: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  switchText: {
    fontSize: 16,
  },
  charCount: {
    textAlign: "right",
    marginBottom: 8,
    color: "#666",
  },
  button: {
    minHeight: 56, 
    paddingVertical: 10,
    backgroundColor: "#2209ffff",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },
  error: {
    color: "#ff4444",
    marginBottom: 8,
    fontSize: 12,
  },
});
