import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/store';

import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  const { ingredients, loading, error } = useSelector(
    (state) => state.ingredients
  );

  const [buns, mains, sauces] = useMemo(() => {
    const bunsArray: TIngredient[] = [];
    const mainsArray: TIngredient[] = [];
    const saucesArray: TIngredient[] = [];

    ingredients.forEach((item: TIngredient) => {
      if (item.type === 'bun') bunsArray.push(item);
      else if (item.type === 'main') mainsArray.push(item);
      else if (item.type === 'sauce') saucesArray.push(item);
    });

    return [bunsArray, mainsArray, saucesArray];
  }, [ingredients]);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
    rootMargin: '-100px 0px 0px 0px'
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
    rootMargin: '-100px 0px 0px 0px'
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
    rootMargin: '-100px 0px 0px 0px'
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    const refs = {
      bun: titleBunRef,
      main: titleMainRef,
      sauce: titleSaucesRef
    };

    const ref = refs[tab as TTabMode];
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  if (error) {
    return <div>Ошибка загрузки ингредиентов: {error}</div>;
  }

  if (loading && ingredients.length === 0) {
    return <div>Загрузка ингредиентов...</div>;
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
