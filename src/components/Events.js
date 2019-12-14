import React from 'react'
import { createUseStyles } from 'react-jss'
import { useSelector } from 'react-redux'
import { getEvents, isEventsReady } from '../selectors'
import { ReactComponent as TitleIcon } from '../icons/vivid-angle-top-left.svg'
import theme from '../style/theme'
import Event from './Event'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Events = () => {
  const classes = useStyles()
  const ready = useSelector(isEventsReady)
  const events = useSelector(getEvents)

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        <TitleIcon className={classes.titleIcon} />
        Results
        {ready && events && (
          <span>: {events.length > 0 ? events.length : 'no'} events found</span>
        )}
      </h3>
      {!ready && <div className={classes.loader}><Loader type='Circles' color='#dc1a83' height={80} width={80} /></div>}
      {ready && (
        <div className={classes.tilesWrapper}>
          <div className={classes.tiles}>
            {events.map(event => <Event key={event.id} className={classes.tile} content={event} />)}
          </div>
        </div>
      )}
    </div>
  )
}

const useStyles = createUseStyles({
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    marginTop: '-70px'
  },
  title: {
    paddingLeft: 20,
    position: 'relative'
  },
  titleIcon: {
    position: 'absolute',
    left: 0,
    top: 5,
    width: 11,
    height: 11,
    fill: 'currentColor'
  },
  tilesWrapper: {
    margin: [0, 'auto'],
    maxWidth: theme.maxTileWidth,
    '@media (min-width: 768px)': {
      maxWidth: theme.maxTileWidth * 2 + theme.gutter
    },
    '@media (min-width: 1200px)': {
      maxWidth: theme.maxTileWidth * 3 + theme.gutter * 2
    }
  },
  tiles: {
    '@media (min-width: 768px)': {
      marginLeft: -theme.gutter / 2,
      marginRight: -theme.gutter / 2,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start'
    }
  },

  tile: {
    margin: [0, 'auto', theme.gutter],
    maxWidth: theme.maxTileWidth,
    '@media (min-width: 768px)': {
      marginLeft: theme.gutter / 2,
      marginRight: theme.gutter / 2,
      width: `calc(50% - ${theme.gutter}px)`
    },
    '@media (min-width: 1200px)': {
      width: `calc(${100 / 3}% - ${theme.gutter}px)`
    }
  }
}, { name: 'Events' })

export default Events
