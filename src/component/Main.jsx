import React, { useEffect } from 'react';

const Main = () => {
    // componentDidMount 대체
    useEffect(() => {
        // 마운트 시 실행할 로직
        
        // componentWillUnmount 대체 (cleanup function)
        return () => {
            // 언마운트 시 실행할 로직
        };
    }, []);

    // componentDidUpdate 대체 - 특정 값 변경 감지 시
    // useEffect(() => {
    //     // props나 state 변경 시 실행할 로직
    // }, [dependency]);

    return (
        <div>

        </div>
    );
};

export default Main;
