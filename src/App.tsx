import {
  AppWrapper,
  AppMiddleColumn,
  CenterSectionWrapper,
  Row,
} from './App.styles'

import LogoSixWrapper from './components/LogoSix/LogoSixWrapper';
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';
import LogoFiveWrapper from './components/LogoFive/LogoFiveWrapper';
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';

function App() {
  return (
    <AppWrapper>
      <AppMiddleColumn>
        <CenterSectionWrapper>
          <Row>
            <LogoOneWrapper guiy={'10px'} />        
            <LogoTwoWrapper guiy={'10px'} />
          </Row>

          <Row>
            <LogoThreeWrapper guiy={'500px'} />
            <LogoFourWrapper guiy={'570px'} />
          </Row>

          <Row>
            <LogoFiveWrapper guiy={'1060px'} />
            <LogoSixWrapper guiy={'1350px'} />
          </Row>
        </CenterSectionWrapper>
      </AppMiddleColumn>
    </AppWrapper>
  )
}

export default App;
