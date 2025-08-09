import React from 'react'
import { Row, Col } from 'antd'
import OptionsNav from './OptionsNavigation/optionsNav'
import MainOptionsPage from './mainOptionsPage/mainOptionsPage'
import { useAuthRedirect } from '../../../hooks/hooks'

const Options: React.FC = () => {
    useAuthRedirect()
    return (
        <Row gutter={[24, 24]} style={{ minHeight: '100vh' }}>
            <Col xs={24} sm={8} md={6} lg={5} xl={4}>
                <OptionsNav />
            </Col>
            <Col xs={24} sm={16} md={18} lg={19} xl={20}>
                <MainOptionsPage />
            </Col>
        </Row>
    )
}

export default Options