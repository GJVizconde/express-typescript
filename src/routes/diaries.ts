import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSesitiveInfo())
})
router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)
  res.send(diary)
})

router.post('/', (req, res) => {
  try {
    console.log(req.body)
    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

    res.send(addedDiaryEntry)
  } catch (error) {
    console.log(error)
    res.status(400).send((error as Error).message)
  }
})

export default router
