import {
  AppWrapper,
  AppMiddleColumn,
  CenterSectionWrapper,
  Row,
} from './App.styles'
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';
import LogoSixWrapper from './components/LogoSix/LogoSixWrapper';
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';
// import LogoFiveWrapperOLD from './components/LogoFiveOLD/LogoFiveWrapperOLD';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';
import LogoFiveWrapper from './components/LogoFive/LogoFiveWrapper';
import LogoSevenWrapper from './components/LogoSeven/LogoSevenWrapper';
import LogoEightWrapper from './components/LogoEight/LogoEightWrapper';

function App() {
  return (
    <AppWrapper>
      <AppMiddleColumn>
        <CenterSectionWrapper>
          <Row>
            <LogoOneWrapper />        
            <LogoTwoWrapper />
          </Row>

          <Row>
            <LogoThreeWrapper />
            <LogoFourWrapper />
          </Row>

          <Row>
            <LogoFiveWrapper />
            <LogoSixWrapper />
          </Row>

          <Row>
            <LogoSevenWrapper />
            <LogoEightWrapper />
          </Row>


        </CenterSectionWrapper>
      </AppMiddleColumn>
    </AppWrapper>
  )
}

export default App;
