import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { TextInput } from "react-native";
const axios = require("axios");

export default function App() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  function getBills() {
    axios.get('https://backend-ivory-phi.vercel.app/bills')
        .then(function (response) {
            // handle success
            data = response.data

            let temp = 0

            // console.log('data gor')
            // console.log(data)
            // setBills(billss)
            for (let i = 0; i < data.length; i++) {
                temp = temp + parseFloat(data[i].amount.$numberDecimal)
                // console.log(temp)

            }

            let userTotal = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i].name === name) {
                    userTotal = userTotal + parseFloat(data[i].amount.$numberDecimal)
                    // console.log(userTotal)

                }

            }

            setTotal(temp)

        })
        .catch(function (error) {
            // handle error

            console.log('error: ' + error);
        })
        .then(function () {
            // always executed
            // add(data)

        });
}

  function addBill() {
    // https://backend-ivory-phi.vercel.app/add/bill
    setIsLoading(true)
    axios
      .post("https://backend-ivory-phi.vercel.app/add/bill", {
        name: name,
        description: description,
        amount: parseFloat(amount),
        paid: false,
      })
      .then((response) => {
        console.log(response);
        setName('');
        setDescription('');
        setAmount('');
        setIsLoading(false)

        // console.log('aaa')
      })
      .catch((error) => {
        console.log(error);
      });
    // dashboardClick() Develepment Reason disable
  }

  useEffect(() => {
    getBills()
    // console.log('update' + bills)

}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.total}>
        Total: <Text style={{ color: "lime" }}>{total.toFixed(2)}$</Text>
      </Text>
      <Text style={styles.total}>
        The Others Owe You: <Text style={{ color: "lime" }}>some $</Text>
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(newText) => setName(newText)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(newText) => setDescription(newText)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Amount"
          value={amount}
          onChangeText={(newText) => setAmount(newText)}
        />
      </View>

      {isLoading ? <ActivityIndicator /> : <TouchableOpacity style={styles.button} onPress={addBill}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    color: "red",
    border: "1px solid red",
    margin: 16,
    padding: 16,
  },
  total: {
    fontSize: 25,
    fontWeight: 900,
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
  inputContainer: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    marginBottom: 16,
  },

  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    borderRadius: 15,
    marginTop: 16,
    width: "65%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#405cf5",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
