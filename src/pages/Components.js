






import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// react components for routing our app without refresh
import { Link } from 'react-router-dom'
// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
// core components
import Header from '../libraries/Header/Header'
import Footer from '../libraries/Footer/Footer'
import GridContainer from '../libraries/Grid/GridContainer'
import GridItem from '../libraries/Grid/GridItem'
import Button from '../libraries/CustomButtons/Button'
import Parallax from '../libraries/Parallax/Parallax'
import HeaderLinks from '../libraries/Header/HeaderLinks'
// sections for this page
import SectionBasics from '../modules/dashboard/components/SectionBasics'
import SectionNavbars from '../modules/dashboard/components/SectionNavbars'
import SectionTabs from '../modules/dashboard/components/SectionTabs'
import SectionPills from '../modules/dashboard/components/SectionPills'
import SectionNotifications from '../modules/dashboard/components//SectionNotifications'
import SectionTypography from '../modules/dashboard/components/SectionTypography'
import SectionJavascript from '../modules/dashboard/components/SectionJavascript'
import SectionCarousel from '../modules/dashboard/components/SectionCarousel'
import SectionCompletedExamples from '../modules/dashboard/components/SectionCompletedExamples'
import SectionLogin from '../modules/dashboard/components/SectionLogin'
import SectionExamples from '../modules/dashboard/components/SectionExamples'
import SectionDownload from '../modules/dashboard/components/SectionDownload'

import componentsStyle from '../assets/jss/material-kit-react/views/components'

class Components extends React.Component {
  render () {
    const { classes, ...rest } = this.props
    return (
      <div>
        <Header
          brand='Crypto store'
          rightLinks={<HeaderLinks />}
          fixed
          color='transparent'
          changeColorOnScroll={{
            height: 400,
            color: 'white'
          }}
          {...rest}
        />
        <Parallax image={require('../assets/images/blockchain_background.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Shopping by crypto currency.</h1>
                  <h3 className={classes.subtitle}>
                    The open world shopping platform.
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionBasics />
          <SectionNavbars />
          <SectionTabs />
          <SectionPills />
          <SectionNotifications />
          <SectionTypography />
          <SectionJavascript />
          <SectionCarousel />
          <SectionCompletedExamples />
          <SectionLogin />
          <GridItem md={12} className={classes.textCenter}>
            <Link to={'/login-page'} className={classes.link}>
              <Button color='primary' size='lg' simple>
                View Login Page
              </Button>
            </Link>
          </GridItem>
          <SectionExamples />
          <SectionDownload />
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(componentsStyle)(Components)
