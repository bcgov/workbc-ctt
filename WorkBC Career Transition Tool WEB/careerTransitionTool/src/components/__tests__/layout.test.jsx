import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../layout';

describe('Layout', () => {
  it('renders a header', () => {
    const { container } = render(
      <Layout>
        <section className="main">
          <h1>hello</h1>
        </section>
      </Layout>,
    );

    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = '__Hello world__';
    const { getByText } = render(
      <Layout>
        <main>
          <h1>{text}</h1>
        </main>
      </Layout>,
    );

    const child = getByText(text);

    expect(child).toBeInTheDocument();
  });
});
