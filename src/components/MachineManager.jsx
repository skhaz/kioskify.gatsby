import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/styles"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab"
import { useFirebase } from "~/providers/firebase"
import PairMachineDialog from "~/components/PairMachineDialog"

const useStyles = makeStyles(theme => ({
  paper: {
    flexGrow: 1,
  },

  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },

  list: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "calc(100vh - 96pt)",
  },
}))

export default () => {
  const [open, setOpen] = useState(false)

  const [machines, setMachines] = useState([])

  const firebase = useFirebase()

  const firestore = firebase.firestore()

  const auth = firebase.auth()

  useEffect(() => {
    const { uid } = auth.currentUser

    const userRef = firestore.doc(`users/${uid}`)

    const unsubscribe = firestore
      .collection("machines")
      .where("user", "==", userRef)
      .onSnapshot(snapshot => {
        const machines = []

        snapshot.forEach(doc => {
          machines.push({ id: doc.id, ...doc.data() })
        })

        setMachines(machines)
      })

    return () => {
      unsubscribe()
    }
  }, [])

  const classes = useStyles()

  const handleSubmit = async value => {
    if (value.replace(/\s/g, "") === "") {
      return
    }

    const machineQuery = await firestore
      .collection("machines")
      .where("pinCode", "==", value.toUpperCase())
      .limit(1)
      .get()

    if (machineQuery.empty) {
      alert("machine not found or offline!")
      return
    }

    const { ref: machineRef } = machineQuery.docs[0]

    const { uid } = auth.currentUser

    const userRef = firestore.doc(`users/${uid}`)

    const groupQuery = await firestore
      .collection("groups")
      .where("user", "==", userRef)
      .where("default", "==", true)
      .limit(1)
      .get()

    const groupRef = groupQuery.empty
      ? firestore.collection("groups").doc()
      : groupQuery.docs[0].ref

    const batch = firestore.batch()

    batch.update(machineRef, {
      pinCode: firebase.firestore.FieldValue.delete(),
    })

    batch.update(machineRef, {
      user: userRef,
      group: groupRef,
      added: new Date(),
    })

    batch.set(groupRef, { user: userRef, default: true }, { merge: true })

    return batch.commit()
  }

  const getPrimary = ({ model, manufacture }) =>
    [model, manufacture].join(" ") || "Untitled"

  const getSecondary = ({ approxLocationn }) => approxLocationn || "Unknow"

  return (
    <Paper className={classes.paper}>
      <List disablePadding className={classes.list}>
        {machines.map(machine => (
          <ListItem button key={machine.id}>
            <ListItemText
              primary={getPrimary(machine)}
              secondary={getSecondary(machine)}
            />
          </ListItem>
        ))}
      </List>
      <Fab
        color="secondary"
        className={classes.fab}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <PairMachineDialog
        open={open}
        onSubmit={value => {
          setOpen(false) || handleSubmit(value)
        }}
        onClose={() => setOpen(false)}
      />
    </Paper>
  )
}
