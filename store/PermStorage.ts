import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "react-native-storage";

const permStorage = new Storage({
    size: 10,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24 * 30,
    enableCache: true,
    sync: {

    }
})

export default permStorage;
