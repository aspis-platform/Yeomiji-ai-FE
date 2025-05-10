import styled from "styled-components";
import { theme } from "../style/theme";
import cross from "../assets/cross.svg";
import { useState } from "react";
import StartView from "../components/main/StartView";
import JobView from "../components/main/JobView";
import HouseForm from "../components/main/HouseFormView";
import HouseOwnershipView from "../components/main/HouseOwnershipView";
import PersonalityView from "../components/main/PersonalityView";
import ActivityLevelView from "../components/main/ActivityLevelView";
import FamilyFormView from "../components/main/FamilyFormView";
import DogSizeView from "../components/main/DogSizeView";
import ResultView from "../components/Result/ResultView";

const AiChat = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [gauge, setGauge] = useState(0);
  const goToNext = () => {
    setCurrentScreen(currentScreen + 1);
    setGauge(gauge + 75);
  };
  const goBack = () => {
    setCurrentScreen(currentScreen - 1);
    setGauge(gauge - 75);
  };

  const screenTexts = [
    {
      title: "당신과 잘 맞는 반려견을 찾아보세요",
      subtitle: "Ai가 당신에게 맞는 애견을 찾아드려요",
    },
    {
      title: "검사자님의 직업을 알려주세요",
      subtitle: "수집한 개인정보는 ai 모델에 전달되고 저장되지 않아요",
      progress: "단계 1/7",
      percentage: "14% 완료",
    },
    {
      title: "검사자님의 집 형태를 알려주세요",
      subtitle: "수집한 개인정보는 ai 모델에 전달되고 저장되지 않아요",
      progress: "단계 2/7",
      percentage: "28% 완료",
    },
    {
      title: "주택 소유 여부를 알려주세요",
      subtitle: "수집한 개인정보는 ai 모델에 전달되고 저장되지 않아요",
      progress: "단계 3/7",
      percentage: "42% 완료",
    },
    {
      title: "검사자님의 가족 형태를 알려주세요",
      subtitle: "수집한 개인정보는 ai 모델에 전달되고 저장되지 않아요",
      progress: "단계 4/7",
      percentage: "57% 완료",
    },
    {
      title: "검사자님의 성향을 알려주세요",
      subtitle:
        "반려견과의 일상을 함께할 때 가장 편안한 생활 패턴을 선택해주세요",
      progress: "단계 5/7",
      percentage: "71% 완료",
    },
    {
      title: "선호하는 반려견의 활동량을 알려주세요",
      subtitle: "반려견과의 일상을 함께할 때 가장 편안한 활동량을 선택해주세요",
      progress: "단계 6/7",
      percentage: "85% 완료",
    },
    {
      title: "선호하는 반려견의 크기를 알려주세요",
      subtitle: "반려견과의 일상을 함께할 때 가장 편안한 크기를 선택해주세요",
      progress: "단계 7/7",
      percentage: "100% 완료",
    },
    {
      title: "나와 잘 맞는 반려견은...",
    },
  ];

  return (
    <>
      <Section>
        <Container>
          <MainTitle>아스피스 AI 입양 매칭</MainTitle>
          <ChatBox>
            <Exit>
              <img src={cross} alt="" />
            </Exit>
            <Title>나에게 맞는 반려견 찾기</Title>
            {currentScreen > 0 && currentScreen < 8 && (
              <Progress>
                <Bar>
                  <GaugeBar gauge={gauge} />
                </Bar>
                <SmallText>
                  <p>{screenTexts[currentScreen].progress}</p>
                  <p>{screenTexts[currentScreen].percentage}</p>
                </SmallText>
              </Progress>
            )}
            <ScrollableArea>
              <ChatContainer>
                <Text>
                  <Title>{screenTexts[currentScreen].title}</Title>
                  <p>{screenTexts[currentScreen]?.subtitle ?? ""}</p>
                </Text>
                <Main>
                  {currentScreen === 0 && <StartView goToNext={goToNext} />}

                  {currentScreen === 1 && (
                    <JobView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentScreen === 2 && (
                    <HouseForm goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentScreen === 3 && (
                    <HouseOwnershipView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentScreen === 4 && (
                    <FamilyFormView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentScreen === 5 && (
                    <PersonalityView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentScreen === 6 && (
                    <ActivityLevelView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentScreen === 7 && (
                    <DogSizeView goToNext={goToNext} goBack={goBack} />
                  )}

                  {currentScreen === 8 && <ResultView />}
                </Main>
              </ChatContainer>
            </ScrollableArea>
          </ChatBox>
        </Container>
      </Section>
    </>
  );
};

const ScrollableArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;
const Bar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${theme.color.gray2};
  border: none;
  border-radius: 10px;
  overflow: hidden;
`;
const GaugeBar = styled.div<{ gauge: number }>`
  width: ${(prop) => prop.gauge}px;
  height: 100%;
  background-color: ${theme.color.main};
`;
const SmallText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  color: ${theme.color.gray1};
`;
const Progress = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  overflow-y: auto;
`;
const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  font-size: 16px;
  font-weight: 400;
  color: ${theme.color.gray1};
`;
const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: black;
`;
const Exit = styled.div`
  img {
    width: 32px;
    height: 32px;
  }
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;
const ChatBox = styled.div`
  width: 600px;
  height: 720px;
  border-radius: 20px;
  box-shadow: 0 6px 10px 4px rgba(0, 0, 0, 0.15);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  overflow: hidden;
`;
const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
`;
const Section = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AiChat;
