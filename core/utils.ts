import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
    cardStyle: { margin: 7, padding: 5 },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 15,
        borderRadius: 20,
    },
    eventSkeletonStyle: {
        borderWidth: 2, 
        borderRadius: 10, 
    }
})


const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export {
    commonStyles,
    validateEmail
}
