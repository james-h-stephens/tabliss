import * as React from 'react';
const categories: Category[] = require('./categories.json');

interface Category {
  key: string;
  name: string;
}

interface Props {
  category?: string;
  frequency: string;
  placeholder: string;
  onChange: (settings: { [key: string]: string|undefined }) => void;
}

class QuoteSettings extends React.PureComponent<Props> {
  render() {
    return (
      <div className="QuoteSettings">
            <label>
                Frequency
                <select onChange={(ev) => this.selectFrequency(ev.target.value)} value={this.props.frequency}>
                    <option>Per Tab</option>
                    <option>Every 15 Minutes</option>
                    <option>Hourly</option>
                    <option>Daily</option>
                </select>
        </label>
            <label>
                Categories
                </label>
            <label>
          <input
            type="radio"
            checked={this.props.category === undefined}
            onChange={() => this.selectCategory(undefined)}
          />
          {' '}
          All Categories
        </label>

        {categories.map(category =>
          <label key={category.key}>
            <input
              type="radio"
              checked={this.props.category === category.key}
              onChange={() => this.selectCategory(category.key)}
            />
            {' '}
            {category.name}
          </label>
        )}

        <p>
          Powered by
          {' '}
          <a href="https://theysaidso.com" target="_blank" rel="noopener noreferrer">They Said So</a>
          {' '}
          and
          {' '}
          <a href="http://www.developerexcuses.com" target="_blank" rel="noopener noreferrer">Developer Excuses</a>.
        </p>
      </div>
    );
  }

  private selectCategory(category?: string) {
    this.props.onChange({ category });
  }

  private selectFrequency(frequency: string) {
    this.props.onChange({ frequency });
  }
}

export default QuoteSettings;
