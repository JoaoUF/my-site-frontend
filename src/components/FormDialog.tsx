import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface FormDialogProprs {
  open: boolean,
  handleClickOpen: () => void
  handleClose: () => void
  addItem: (value: any) => void
}

export default function FormDialog(props: FormDialogProprs) {
  const { open, handleClickOpen, handleClose, addItem } = props

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries((formData as any).entries())
            const data = {
              name: formJson.name,
              description: formJson.description,
              price: formJson.price,
              image: formJson.image,
              usuario: 1
            }
            addItem(data)
            handleClose();
          },
        }}
      >
        <DialogTitle>Complete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete the following fields in order to create an item.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="image"
            name="image"
            label="Image Link"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Agregar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}