/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { realButtonGroup } from '../../partials/components/real-button-group.js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'

init(
  fi.text('Results title', 'results_title', {
    help_text: 'Enter the title you would like to display above the search results. Leave it blank to hide a title.',
    inline_help_text: 'Search results for “{{searched_term|escape}}”',
    placeholder: 'Search results for “{{searched_term|escape}}”',
    default: 'Search results for “{{searched_term|escape}}”'
  }),
  fi.choice('Title tag', 'heading_tag', {
    choices: [
      ['h1', 'H1'],
      ['h2', 'H2'],
      ['h3', 'H3'],
      ['h4', 'H4'],
      ['h5', 'H5'],
      ['h6', 'H6']
    ],
    default: 'h1',
    required: true,
    help_text: 'Semantic heading tag (h1-h6)',
    display_width: 'half_width',
    visibility: {
      controlling_field_path: 'results_title',
      operator: 'NOT_EMPTY'
    }
  }),
  fi.choice('Title style', 'heading_style', {
    choices: [
      ['display-1', 'Style 12'],
      ['display-2', 'Style 11'],
      ['display-3', 'Style 10'],
      ['display-4', 'Style 9'],
      ['display-5', 'Style 8'],
      ['display-6', 'Style 7'],
      ['h1', 'Style 6 [H1]'],
      ['h2', 'Style 5 [H2]'],
      ['h3', 'Style 4 [H3]'],
      ['h4', 'Style 3 [H4]'],
      ['h5', 'Style 2 [H5]'],
      ['h6', 'Style 1 [H6]']
    ],
    help_text: 'Display different heading styles not related to semantic heading type (tag h1-h6)',
    display_width: 'half_width',
    visibility: {
      controlling_field_path: 'results_title',
      operator: 'NOT_EMPTY'
    }
  }),
  fi.text('Search results count', 'results_count_message', {
    help_text: 'Leave it blank to hide count_message',
    inline_help_text: 'Displaying [[offset]] – [[limit]] of [[total]] results',
    default: 'Displaying [[offset]] – [[limit]] of [[total]] results',
    placeholder: 'Displaying [[offset]] – [[limit]] of [[total]] results'
  }),
  fi.richtext('No results message', 'no_results_message', {
    inline_help_text: 'Sorry. There were no results for [[search_term]].',
    default: '<p>Sorry. There were no results for [[search_term]].</p><p>Try rewording your query, or browse through our site.</p>'
  }),
  fi.choice('Search item title style', 'item_title_style', {
    choices: [
      ['display-1', 'Style 12'],
      ['display-2', 'Style 11'],
      ['display-3', 'Style 10'],
      ['display-4', 'Style 9'],
      ['display-5', 'Style 8'],
      ['display-6', 'Style 7'],
      ['h1', 'Style 6 [H1]'],
      ['h2', 'Style 5 [H2]'],
      ['h3', 'Style 4 [H3]'],
      ['h4', 'Style 3 [H4]'],
      ['h5', 'Style 2 [H5]'],
      ['h6', 'Style 1 [H6]']
    ],
    required: true,
    default: 'h5',
    help_text: 'Display different heading styles not related to semantic heading type (tag h1-h6)',
    visibility: {
      controlling_field_path: 'results_title',
      operator: 'NOT_EMPTY'
    }
  }),
  fi.number('Search result items per page', 'items_per_page', {
    default: 10
  }),
  group('Pagination', 'pagination', {},
    fi.boolean('Show first/last arrows', 'show_first_and_last_arrows', {
      default: true,
      display: 'checkbox',
      display_width: 'half_width'
    }),
    fi.boolean('Show first/last labels', 'show_first_and_last_labels', {
      default: true,
      display: 'checkbox',
      display_width: 'half_width'
    }),
    fi.text('First label', 'first_label', {
      default: 'First Page',
      visibility: {
        controlling_field_path: 'pagination.show_first_and_last_labels',
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.text('Last label', 'last_label', {
      default: 'Last Page',
      visibility: {
        controlling_field_path: 'pagination.show_first_and_last_labels',
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.boolean('Show previous/next arrows', 'show_previous_and_next_arrows', {
      default: true,
      display: 'checkbox',
      display_width: 'half_width'
    }),
    fi.boolean('Show previous/next labels', 'show_previous_and_next_labels', {
      default: true,
      display: 'checkbox',
      display_width: 'half_width'
    }),
    fi.text('Previous label', 'previous_label', {
      default: 'Previous',
      visibility: {
        controlling_field_path: 'pagination.show_previous_and_next_labels',
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.text('Next label', 'next_label', {
      default: 'Next',
      visibility: {
        controlling_field_path: 'pagination.show_previous_and_next_labels',
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.boolean('Show numbers', 'show_numbers', {
      default: true,
      display: 'checkbox',
      display_width: 'half_width'
    }),
    fi.text('Navigation aria label', 'navigation_aria_label', {
      default: 'Paging navigation',
      help_text: 'Accessibility feature'
    }),
    fi.text('Current page aria label', 'current_page_aria_label', {
      default: 'Current Page',
      help_text: 'Accessibility feature'
    }),
    fi.text('Page number aria label', 'page_number_aria_label', {
      default: 'Page',
      help_text: 'Accessibility feature'
    })
  )
)
