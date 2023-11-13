import { AlertDialog } from 'native-base'
import React, { forwardRef, useEffect, useImperativeHandle } from 'react'

interface ICustomAlertDialogProps {
  title: string
  alertBody: React.ReactNode
  alertFooter?: React.ReactNode
}

const CustomAlertDialog = forwardRef((props: ICustomAlertDialogProps, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const cancelRef = React.useRef(null);

  useImperativeHandle(ref, () => ({
    toggleAlert(flag: boolean) { setIsOpen(flag) }
  }));

  return (
    <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)} leastDestructiveRef={cancelRef}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{props.title}</AlertDialog.Header>
        <AlertDialog.Body>
          {props.alertBody}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          {props.alertFooter}
        </AlertDialog.Footer>
      </AlertDialog.Content>

    </AlertDialog>
  )
})

export default CustomAlertDialog