import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/styles"
import { sortableElement } from "react-sortable-hoc"
import ListItem from "@material-ui/core/ListItem"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import { useFirebase } from "~/providers/firebase"

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",

    backgroundColor: "white",

    "&:hover": {
      backgroundColor: "lightgrey !important",
    },

    "&$selected": {
      backgroundColor: "lightgrey",
    },
  },

  thumbnail: {
    width: 160,
    height: 90,
    borderRadius: 0,
    margin: 8,
  },

  action: {
    top: "30%",
  },
})

export default sortableElement(props => {
  const { value, selected, onClick } = props

  const [holder, setHolder] = useState()

  const [views, setViews] = useState(0)

  const classes = useStyles()

  const firebase = useFirebase()

  const firestore = firebase.firestore()

  const stringify = (error, ready, durationInSec) => {
    if (error) {
      return "⚠︎"
    }

    if (ready) {
      const date = new Date(durationInSec * 1000)
      const v1 = date.getUTCMinutes()
      const v2 = date.getSeconds()
      const mins = v1 < 10 ? "0" + v1 : v1
      const secs = v2 < 10 ? "0" + v2 : v2

      return [mins, secs].join(":")
    }

    return "..."
  }

  const handleVideo = snapshot => {
    if (!snapshot.exists) {
      return
    }

    const document = snapshot.data()

    if (!document) {
      return
    }

    const { error, ready, durationInSec, yid } = document

    const status = stringify(error, ready, durationInSec)

    const thumbnail = `https://i.ytimg.com/vi/${yid}/mqdefault.jpg`

    const title = document.title || `https://www.youtube.com/watch?v=${yid}`

    setHolder({ status, ready, title, thumbnail })
  }

  const handleShards = snapshot => {
    let views = 0

    snapshot.forEach(doc => {
      views += doc.data().count
    })

    setViews(views)
  }

  useEffect(() => {
    const { vid: id } = value

    const subscribers = [
      firestore
        .collection("videos")
        .doc(id)
        .onSnapshot(handleVideo),
      firestore
        .collection("videos")
        .doc(id)
        .collection("shards")
        .onSnapshot(handleShards),
    ]

    return () => subscribers.forEach(fn => fn())
  }, [])

  return (
    <ListItem
      selected={selected}
      className={classes.root}
      onClick={() => {
        onClick(value)
      }}
    >
      {holder && (
        <>
          <ListItemAvatar>
            <Avatar className={classes.thumbnail} src={holder.thumbnail} />
          </ListItemAvatar>
          <ListItemText primary={holder.title} secondary={holder.status} />
          <ListItemText
            primary={
              <Typography variant="body2" align="right">
                {views}
              </Typography>
            }
          />
        </>
      )}
    </ListItem>
  )
})
