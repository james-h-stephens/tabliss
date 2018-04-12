import get from 'lodash-es/get';
import has from 'lodash-es/has';
import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending } from '../../../data';
require('./Quote.sass');

interface Props {
  category?: string;
  frequency: string;
  local?: Data;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  setLocal: (state: Data) => void;
}

interface Data {
  author?: string;
  date: Date;
  quote: string;
}

const TWITTER_URL = 'https://twitter.com/intent/tweet?text=';

class Quote extends React.PureComponent<Props> {
  componentWillMount() {
    if (this.shouldGetNewQuote()) {
      this.getQuote(this.props).then(quote => this.props.setLocal(quote));
    }
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.category !== props.category) {
      this.getQuote(props).then(quote => this.props.setLocal(quote));
    }
  }

    render() {
        const quote = `"${get(this.props, 'local.quote')}"`;
        var author = has(this.props, 'local.author') ? '\r\n— ' + get(this.props, 'local.author') : '';
        var credit = '\r\n\r\nQuote provided by Tabliss:';
        var url = '&url=https://tabliss.io';
        var href = encodeURI(TWITTER_URL + quote + author + credit + url);

        return (
          <h4 className="Quote">
            {get(this.props, 'local.quote')}
            {has(this.props, 'local.author') && <sub><br />&mdash; {get(this.props, 'local.author')}</sub>}
                <br />
                <a href={href} target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social" />
            </a>
          </h4>
        );
    }

    private shouldGetNewQuote(): boolean {
        const date = get(this.props, 'local.date') instanceof Date ? get(this.props, 'local.date') : new Date(); 

        const hours = Math.abs(new Date().getTime() - date.getTime()) / 3.6e6;
        switch (this.props.frequency) {
            case 'Per Tab':
                {
                    return true;
                }
            case 'Every 15 Minutes':
                {
                    return hours > .25;
                }
            case 'Hourly':
                {
                    return hours > 1;
                }
            case 'Daily':
                {
                    return new Date().getDate() !== (get(this.props, 'local.date') as Date).getDate();
                }
            default:
                {
                    return false;
                }
        }
  }

  // Get a quote
  private async getQuote({ category }: Props): Promise<Data> {
    this.props.pushPending();

    const quote = category === 'developerexcuses'
      ? await this.getDeveloperExcuse()
      : await this.getQuoteOfTheDay(category);

    this.props.popPending();

    return quote;
  }

  // Get developer excuse
  private async getDeveloperExcuse(): Promise<Data> {
    try {
      const res = await fetch(`${process.env.API_ENDPOINT}/developer-excuses`);
      const body = await res.json();

      return {
        date: new Date(),
        quote: body.data,
      };
    } catch (err) {
      return {
        date: new Date(0o1, 1, 1),
        quote: 'Unable to get a new developer excuse.',
      };
    }
  }

  // Get quote of the day
  private async getQuoteOfTheDay(category?: string): Promise<Data> {
    const res = await fetch('https://quotes.rest/qod.json' + (category ? `?category=${category}` : ''));
    const body = await res.json();

    if (res.status === 429) {
      return {
        author: body.error.message.split('.')[1] + '.',
        date: new Date(0o1, 1, 1),
        quote: 'Too many requests this hour.',
      };
    }

    return {
      author: get(body, 'contents.quotes[0].author'),
      date: new Date(),
      quote: get(body, 'contents.quotes[0].quote'),
    };
  }
}

const mapDispatchToProps = { popPending, pushPending };

export default connect(null, mapDispatchToProps)(Quote);
