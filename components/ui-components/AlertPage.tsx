import LottieView from 'lottie-react-native'
import { Button, Text, View } from 'native-base'
import React, { forwardRef, useImperativeHandle } from 'react'
import { StyleSheet } from 'react-native'
import { AlertStatus, ICustomAlertRef } from '../../core/types/common'

const getAnimatedIcon = (type: AlertStatus) => {
  switch (type) {
    case 'error':
      return require('../../assets/animated_icons/error.json')
    case 'success':
      return require('../../assets/animated_icons/success.json')

  }
}

const AlertPage = forwardRef<ICustomAlertRef>((props, ref) => {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false)
  const [type, setType] = React.useState<AlertStatus>('success');
  const [customIcon, setCustomIcon] = React.useState();
  const [showCloseIcon, setShowCloseIcon] = React.useState(false)

  
  useImperativeHandle(ref, () => ({
    showAlert: (message: string, status: AlertStatus, details?: string, 
      customIcon?: any, showCloseIcon: boolean = false) => {
      setAlertMessage(message)
      setShowCloseIcon(showCloseIcon)
      setType(status)
      setShowAlert(true)
    },
    closeAlert: (clearMessage?: boolean) => {

    }
  }))

  if (showAlert) {
    return <View style={style.container}>
      <LottieView
        source={customIcon ? customIcon : getAnimatedIcon(type)}
        style={{ width: 120, height: 120 }}
        autoPlay
        loop
      />
      <Text fontSize={20} marginTop={7} fontWeight={'semibold'}>{alertMessage}</Text>
      {showCloseIcon && 
        <Button marginTop={4} variant={'subtle'} backgroundColor={'gray.100'} >
          <Text fontSize={16} onPress={() => setShowAlert(false)}>Close</Text>
        </Button>}
    </View>
  } else {
    return <></>
  }
});

const style = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    position: 'absolute',
    backgroundColor: 'white',
  }
});

export default AlertPage