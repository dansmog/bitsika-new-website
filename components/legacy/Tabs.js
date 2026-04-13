"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classNames from 'classnames';

export const Tabs = ({ tabs, selectedTab, setSelectedTab, locale, keyToUse }) => {
  return (
    <div>
      <div className="sm:block">
        <div className="border-gray-200 mb-1">
          <nav className="-mb-px flex space-x-4 items-center overflow-scroll no-scrollbar" aria-label="Tabs">
            {tabs.map((tab) => (
              <div key={tab.name}>
                <button
                  key={tab.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTab(tab);
                  }}
                  className={classNames(
                    tab[keyToUse] === selectedTab
                      ? ' text-gray-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 ',
                    'whitespace-nowrap py-2 px-1 font-medium text-sm flex items-center capitalize cursor-pointer',
                  )}
                  aria-current={tab[keyToUse] === selectedTab ? 'page' : undefined}
                >
                  {tab.icon && <tab.icon className="h-5 w-5 mr-2" />}
                  {tab.locale ? tab.locale : tab.name}
                </button>
                <div className={classNames(tab[keyToUse] === selectedTab ? "border-gray-600" : "border-transparent", ' border-t-4 rounded h-3')} />
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
