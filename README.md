# frontend-project-lvl2
## Второй учебный проект по JS "Вычислитель отличий".
### Hexlet tests and linter status:
[![Actions Status](https://github.com/alice-shamaeva/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/alice-shamaeva/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/6563e876e0b2c77f1162/maintainability)](https://codeclimate.com/github/alice-shamaeva/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/6563e876e0b2c77f1162/test_coverage)](https://codeclimate.com/github/alice-shamaeva/frontend-project-46/test_coverage)

## Для установки пакета надо совершить следующие действия:
- Клонировать репозиторий;
- Установить npm с помощью команды 'make install' из корневого каталога;
- Создать локальную связь с помощью команды 'npm link' (вероятно придётся запустить под sudo);

## Описание и использование
    Вычислитель отличий представляет из себя утилиту для сравнения конфигурационных файлов.Отуствие плюса или минуса в выводе говорит о том, что данная строчка не была изменена. Плюс обозначет добавление нового свойства или значения.
    Чтобы получить всю информацию о функционале данной утилиты, потребуется ввести в терминал команду 'gendiff -h'.
```bash
gendiff -h

Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
-V, --version        output the version number
-f, --format [type]  output format
-h, --help           output usage information
```
