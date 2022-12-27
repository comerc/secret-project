import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from '@lexical/markdown'

const transformers = [
  ...ELEMENT_TRANSFORMERS,
  ...TEXT_MATCH_TRANSFORMERS,
  ...TEXT_FORMAT_TRANSFORMERS,
  CHECK_LIST,
]

export default transformers
