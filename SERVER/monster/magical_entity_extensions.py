import os
from .case_converters import pascal_to_snake
from .case_converters import pascal_to_camel
from .iterable_file_writer import write_from_iterable


class MagicalEntityExtensions:

    def __init__(self, project_root):
        self.project_root = project_root

    def create_magical_extensions(self):
        with open(f'{self.project_root}/app/core/ElectroMagicalExtensions.php', 'w+') as magic_extensions:
            extension_methods = [
                'private function findLastEntityOrKill(',
                '    $iterable,',
                '    $msg,',
                '    ?int $contract_code,',
                '    $compromised=false',
                ') {',
                '    if (count($iterable) === 0) {',
                '        if ($contract_code !== null) {',
                '            $this->onKillContractSigned($contract_code);',
                '        }',
                '        if ($compromised) {',
                '            $this->killAsCompromised([ $msg => true ]);',
                '        } else {',
                '            $this->killAsFailure([ $msg => true ]);',
                '        }',
                '    }',
                '    return end($iterable);',
                '}\n',

                'private function killIfNull(',
                '    $payload,',
                '    string $msg,',
                '    ?int $contract_code,',
                '    bool $compromised=false',
                ') {',
                '    if ($payload === null) {',
                '        if ($contract_code !== null) {',
                '            $this->onKillContractSigned($contract_code);',
                '        }',
                '        if ($compromised) {',
                '            $this->killAsCompromised([ $msg => true ]);',
                '        } else {',
                '            $this->killAsFailure([ $msg => true ]);',
                '        }',
                '    }',
                '    return $payload;',
                '}\n',

                'private function killIfEmpty(',
                '    $payload,',
                '    string $msg,',
                '    ?int $contract_code,',
                '    bool $compromised=false',
                ') {',
                '    if (count($payload) === 0) {',
                '        if ($contract_code !== null) {',
                '            $this->onKillContractSigned($contract_code);',
                '        }',
                '        if ($compromised) {',
                '            $this->killAsCompromised([ $msg => true ]);',
                '        } else {',
                '            $this->killAsFailure([ $msg => true ]);',
                '        }',
                '    }',
                '    return $payload;',
                '}\n'
            ]

            for tsf in os.listdir(f'{self.project_root}/app/database/structures'):
                slug = tsf.split('.json')[0]

                extension_methods.extend([
                    f"public function findLast{slug}EntityOrKillFailure(",
                    f"    array ${pascal_to_camel(slug)}s, ",
                    f"    ?int $contract_code=null,",
                    f"    $msg=''",
                    f"): {slug}Entity {{",
                    f"    return $this->findLastEntityOrKill(",
                    f"         ${pascal_to_camel(slug)}s,",
                    f"         $msg === '' ? 'failed_to_find_{pascal_to_snake(slug)}_entity' : $msg,",
                    f"         $contract_code",
                    f"     );",
                    "}\n",

                    f"public function findLast{slug}EntityOrKillCompromised(",
                    f"    array ${pascal_to_camel(slug)}s,",
                    f"    ?int $contract_code=null,",
                    f"    $msg=''",
                    f"): {slug}Entity {{",
                    f"    return $this->findLastEntityOrKill(",
                    f"        ${pascal_to_camel(slug)}s,",
                    f"        $msg === '' ? 'data_compromised_{pascal_to_snake(slug)}_entity_must_exist_but_not_found' : $msg,",
                    f"        $contract_code,",
                    f"        true",
                    f"    );",
                    "}\n",

                    f"public function killFailureIfNullElseGet{slug}Entity(",
                    f"    ?{slug}Entity ${pascal_to_camel(slug)}Entity,",
                    f"    ?int $contract_code=null,",
                    f"     string $msg=''",
                    f"): {slug}Entity {{",
                    f"    return $this->killIfNull(",
                    f"        ${pascal_to_camel(slug)}Entity, ",
                    f"        $msg === '' ? '{pascal_to_snake(slug)}_entity_not_found' : $msg,",
                    f"        $contract_code",
                    f"    );",
                    "}\n",

                    f"public function killCompromisedIfNullElseGet{slug}Entity(",
                    f"    ?{slug}Entity ${pascal_to_camel(slug)}Entity, ",
                    f"    ?int $contract_code=null,",
                    f"     string $msg=''",
                    f"): {slug}Entity {{",
                    f"    return $this->killIfNull(",
                    f"        ${pascal_to_camel(slug)}Entity,",
                    f"        $msg === '' ? 'data_compromised_{pascal_to_snake(slug)}_entity_not_found' : $msg,",
                    f"        $contract_code,",
                    f"        true",
                    f"    );",
                    "}\n",

                    f'/**',
                    f' * @param {slug}Entity[] ${pascal_to_camel(slug)}Entities',
                    f' * @param string $msg',
                    f' * @param int|null $contract_code',
                    f' * @return {slug}Entity[]',
                    f' */',
                    f"public function killFailureIfEmptyElseGet{slug}Entities(",
                    f"    array ${pascal_to_camel(slug)}Entities,",
                    f"    ?int $contract_code=null,",
                    f"    string $msg=''",
                    f"): array {{",
                    f"    return $this->killIfEmpty(",
                    f"        ${pascal_to_camel(slug)}Entities,",
                    f"        $msg === '' ? '{pascal_to_snake(slug)}_entities_not_found' : $msg,",
                    f"        $contract_code",
                    f"    );",
                    "}\n",

                    f'/**',
                    f' * @param {slug}Entity[] ${pascal_to_camel(slug)}Entities',
                    f' * @param string $msg',
                    f' * @param int|null $contract_code',
                    f' * @return {slug}Entity[]',
                    f' */',
                    f"public function killCompromisedIfEmptyElseGet{slug}Entities(",
                    f"    array ${pascal_to_camel(slug)}Entities,",
                    f"    ?int $contract_code=null,",
                    f"    string $msg=''",
                    f"): array {{",
                    f"    return $this->killIfEmpty(",
                    f"        ${pascal_to_camel(slug)}Entities,",
                    f"        $msg === '' ? 'data_compromised_{pascal_to_snake(slug)}_entities_not_found' : $msg,",
                    f"        $contract_code,",
                    f"        true",
                    f"    );",
                    "}\n"
                ])

            extension_methods.extend([
                'private function isNone($payload): bool {',
                '    return $payload === null || (is_array($payload) && count($payload) === 0);',
                '}\n',

                'public function killCustomFailureIfAnyHaveSome(',
                '    string $msg,',
                '    ?int $contract_code,',
                '    ...$args',
                '): void {',
                '    foreach ($args as $payload) {',
                '        if (!$this->isNone($payload)) {',
                '            if ($contract_code !== null) {',
                '                $this->onKillContractSigned($contract_code);',
                '            }',
                '            $this->killAsFailure([$msg => true]);',
                '        }',
                '    }',
                '}\n',

                'public function killCustomFailureIfAnyHasNone(string $msg, ?int $contract_code, ...$args): void {',
                '    foreach ($args as $payload) {',
                '        if ($this->isNone($payload)) {',
                '            if ($contract_code !== null) {',
                '                $this->onKillContractSigned($contract_code);',
                '            }',
                '            $this->killAsFailure([$msg => true]);',
                '        }',
                '    }',
                '}\n',

                'public function killCustomFailureWhenAllHaveNone(string $msg, ?int $contract_code, ...$args): void {',
                '    $every_one_have_none = true;',
                '    foreach ($args as $payload) {',
                '        if (!$this->isNone($payload)) {',
                '            $every_one_have_none = false;',
                '            break;',
                '        }',
                '    }',
                '    if ($every_one_have_none) {',
                '        if ($contract_code !== null) {',
                '            $this->onKillContractSigned($contract_code);',
                '        }',
                '        $this->killAsFailure([$msg => true]);',
                '    }',
                '}\n',

                'public function killCustomFailureWhenAllHaveSome(string $msg, ?int $contract_code, ...$args): void {',
                '    $every_one_have_something = true;',
                '    foreach ($args as $payload) {',
                '        if ($this->isNone($payload)) {',
                '            $every_one_have_something = false;',
                '            break;',
                '        }',
                '    }',
                '    if ($every_one_have_something) {',
                '        if ($contract_code !== null) {',
                '            $this->onKillContractSigned($contract_code);',
                '        }',
                '        $this->killAsFailure([$msg => true]);',
                '    }',
                '}\n',

                'public function killFailureIfImageNotSaved(',
                '    string $request_key,',
                '    bool $saved,',
                '    ?int $contract_code=null',
                '): void {',
                '    if (!$saved) {',
                '        if ($contract_code !== null) {',
                '            $this->onKillContractSigned($contract_code);',
                '        }',
                '        $this->killAsFailure([',
                "            'failed_to_save_' . $request_key . '_file' => true",
                '        ]);',
                '    }',
                '}\n',

                'public function deleteFileTillItDoesNotDelete(string $path): void {',
                '    while (true) {',
                '        if (!file_exists($path)) {',
                '            break;',
                '        }',
                '        unlink($path);',
                '    }',
                '}\n',

                'public function killWithBadRequestExceptionIfTextualParamIsMissing(string $param): void {',
                '    if (!isset($_POST[$param])) {',
                '        $this->killAsBadRequestWithMissingParamException($param);',
                '    }',
                '}\n',

                'public function killWithBadRequestExceptionIfMultipartParamIsMissing(string $param): void {',
                '    if (!isset($_FILES[$param])) {',
                '        $this->killAsBadRequestWithMissingParamException($param);',
                '    }',
                '}'
            ])

            write_from_iterable(magic_extensions, [
                '<?php\n\n',
                'trait ElectroMagicalExtensions {\n'
            ])

            write_from_iterable(magic_extensions, extension_methods, prefix=' ' * 4, suffix='\n')

            magic_extensions.write('}\n')
