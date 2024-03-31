import { MaterialIcons } from '@expo/vector-icons'
import { AlertDialog, Button, Icon, Text, VStack } from 'native-base'
import React, { forwardRef, useImperativeHandle } from 'react'
import { AlertStatus, ICustomAlertRef } from '../../core/types/common'

interface ICustomAlertDialogProps {
  title: string
  type?: AlertStatus
  message?: string
  alertBody?: React.ReactNode
  alertFooter?: React.ReactNode

  onClose?: () => void
}

const getIconComponentByStatus = (status: AlertStatus | undefined) => {
  switch (status) {
    case 'success':
      return <Icon as={<MaterialIcons name='check-circle' />} marginRight={5} color={'green.600'} size={24} />
    case 'error':
      return <Icon as={<MaterialIcons name='dangerous' />} marginRight={5} color={'red.600'} size={24} />
    case 'warn':
      return <Icon as={<MaterialIcons name='error' />} marginRight={5} color={'yellow.600'} size={24} />
    case 'info':
      return <Icon as={<MaterialIcons name='info' />} marginRight={5} color={'blue.400'} size={24} />
    default:
      return <></>
  }
}

const CustomAlertDialog = forwardRef<ICustomAlertRef, ICustomAlertDialogProps>((props: ICustomAlertDialogProps, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [message, setMessage] = React.useState<string>();
  const [details, setDetails] = React.useState<string>();
  const cancelRef = React.useRef(null);
  const [status, setStatus] = React.useState<AlertStatus>();

  useImperativeHandle(ref, () => ({
    showAlert(message: string, status: AlertStatus, details?: string, 
      customIcon?: any, showCloseIcon?: boolean) {
      setIsOpen(true)
      setMessage(message);
      setDetails(details)
      status && setStatus(status)
    },
    closeAlert(clearMessage?: boolean) {
      setIsOpen(false)
      if (clearMessage) {
        setMessage(undefined);
        setDetails(undefined);
      }
    }
  }));

  const onClose = React.useCallback(() => {
    setIsOpen(false)
    if (props.onClose) {
      props.onClose();
    }
  }, [props.onClose])

  return (
    <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)} leastDestructiveRef={cancelRef}>
      <AlertDialog.Content width={'100%'} >
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          {props.title}
        </AlertDialog.Header>
        <AlertDialog.Body paddingTop={10} paddingBottom={10}>
          {props.alertBody ? props.alertBody :
            <VStack justifyContent={'center'} alignItems={'center'} height={'100%'}>
              {getIconComponentByStatus(status)}
              <VStack flex={1}>
                <Text fontSize={20}>{message}</Text>
                {details && <Text fontSize={13}>{details}</Text>}
              </VStack>
            </VStack>}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          {props.alertFooter || <Button onPress={onClose}>
            <Text color={'white'}>Close</Text>
          </Button>}
        </AlertDialog.Footer>
      </AlertDialog.Content>

    </AlertDialog>
  )
})


export {
  CustomAlertDialog,
  ICustomAlertDialogProps,
  ICustomAlertRef
}
