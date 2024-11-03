import React from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Home = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 4,
        paddingBottom: 4
      }}
    >
      {/* Introduction Section */}
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant='h3' align='center' gutterBottom>
          Miracom Lighthouse 서비스
        </Typography>
        <Typography
          variant='body1'
          color='textSecondary'
          align='center'
          paragraph
        >
          더 나은 사용자 경험을 위한 솔루션 성능 최적화 서비스
        </Typography>
        <Typography
          variant='body1'
          color='textSecondary'
          align='center'
          paragraph
        >
          Google Lighthouse를 활용하여 웹 애플리케이션의 UI 성능을 종합적으로
          테스트하고 개선할 수 있도록 지원하는 사내 전용 솔루션입니다.
        </Typography>
      </Box>

      {/* Feature Section */}
      <Box mt={4} sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant='h4' gutterBottom>
          서비스 주요 기능
        </Typography>
        <Box display='flex' flexWrap='wrap' gap={3} justifyContent='center'>
          {[
            {
              title: '핵심 웹 성능 지표 분석',
              description:
                'Google Lighthouse가 측정하는 핵심 지표(FCP, LCP, TBT, CLS 등)를 기반으로 성능을 수치화하고 시각적으로 제공합니다.'
            },
            {
              title: '자동화된 성능 테스트 및 스케줄링',
              description:
                '설정된 주기에 따라 UI 성능 테스트를 자동 실행하여 지속적인 모니터링을 제공합니다. 성능 데이터를 수집하고 변화 트렌드를 분석합니다.'
            },
            {
              title: '다양한 기기 및 네트워크 환경 시뮬레이션',
              description:
                '데스크톱, 모바일, 저속 네트워크 등 여러 환경에서의 성능 차이를 분석하여 실 사용자의 환경을 시뮬레이션합니다.'
            },
            {
              title: '성능 리포트 및 이력 관리',
              description:
                '테스트 결과를 PDF 및 기타 형식의 리포트로 생성하고 과거 성능 기록을 저장하여 성능 변화를 추적할 수 있습니다.'
            },
            {
              title: '알림 및 성능 문제 모니터링',
              description:
                '중요한 성능 문제 발생 시 실시간 알림을 통해 신속하게 대응할 수 있도록 합니다.'
            }
          ].map((feature, index) => (
            <Card
              key={index}
              variant='outlined'
              sx={{width: 300, flex: '1 1 300px'}}
            >
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Expected Benefits Section */}
      <Box mt={6} sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant='h4' gutterBottom>
          기대 효과
        </Typography>
        <List>
          {[
            '사용자 만족도 향상: 최적화된 로딩 시간과 원활한 상호작용으로 사용자 경험을 개선',
            '개발 효율성 증대: 성능 문제를 조기에 파악하고 우선순위 설정으로 리소스 효율화',
            '지속적 개선: 성능 점수 및 이력 관리로 UI 최적화를 지속적으로 유지'
          ].map((benefit, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary={benefit} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Target Audience Section */}
      <Box mt={6} sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant='h4' gutterBottom>
          대상 및 사용 사례
        </Typography>
        <Box display='flex' flexWrap='wrap' gap={3} justifyContent='center'>
          {[
            {
              role: 'UI/UX 팀',
              description: '사용자 경험 개선을 위한 데이터 기반의 인사이트 제공'
            },
            {
              role: '개발팀',
              description:
                '성능 문제를 사전에 점검하여 개발 중 버그 및 오류 최소화'
            },
            {
              role: '서비스 운영팀',
              description:
                '성능 저하 시 실시간 알림을 통해 신속한 문제 해결 지원'
            }
          ].map((target, index) => (
            <Card
              key={index}
              variant='outlined'
              sx={{width: 300, flex: '1 1 300px'}}
            >
              <CardHeader title={target.role} />
              <CardContent>
                <Typography variant='body2' color='textSecondary'>
                  {target.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default Home
