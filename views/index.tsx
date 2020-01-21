import * as React from 'react';
import {GetHelloView} from '../src/app.controller';
import {useState} from 'react';

const Index = (props: GetHelloView) => {
    const [count, setCount] = useState<number>(props.count);

    return (
        <React.Fragment>
            <p>Hello Sir {props.nome}!</p>
            <button onClick={() => setCount(count + 1)}>Click Me {count} times</button>
            <p>Message from state: {props.nome}</p>
        </React.Fragment>
    );
};

export default Index;
