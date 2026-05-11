import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { TestPage } from './TestPage';
import { ResultPage } from './ResultPage';
import { useTestStore } from '../store/testStore';

const renderTestFlow = () =>
  render(
    <MemoryRouter initialEntries={['/test']}>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </MemoryRouter>,
  );

describe('TestPage', () => {
  beforeEach(() => {
    useTestStore.getState().resetTest();
    localStorage.clear();
  });

  it('selects an option and moves to the next question', async () => {
    const user = userEvent.setup();
    renderTestFlow();

    await user.click(screen.getByRole('button', { name: /^A/i }));
    await user.click(screen.getByRole('button', { name: /下一题/i }));

    expect(screen.getByText(/Q2 \/ 15/i)).toBeInTheDocument();
  });

  it('prevents going next without a selected option', async () => {
    const user = userEvent.setup();
    renderTestFlow();

    await user.click(screen.getByRole('button', { name: /下一题/i }));

    expect(screen.getByText(/先选一个最像你的精神反应/)).toBeInTheDocument();
    expect(screen.getByText(/Q1 \/ 15/i)).toBeInTheDocument();
  });

  it('jumps to the result page after completing all questions', async () => {
    const user = userEvent.setup();
    renderTestFlow();

    for (let index = 0; index < 15; index += 1) {
      await user.click(screen.getByRole('button', { name: /^A/i }));
      await user.click(
        screen.getByRole('button', {
          name: index === 14 ? /查看结果/i : /下一题/i,
        }),
      );
    }

    expect(await screen.findByText(/五行分数盘/)).toBeInTheDocument();
  });
});
