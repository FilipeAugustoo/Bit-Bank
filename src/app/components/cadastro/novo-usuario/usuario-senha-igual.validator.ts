import { FormGroup } from '@angular/forms';

export function usuarioSenhaIguaisValidator(formGroup: FormGroup) {
  const usuario = formGroup.get('userName')?.value ?? '';
  const senha = formGroup.get('password')?.value ?? '';

  if (usuario.trim() + senha.trim()) {
    return usuario !== senha ? null : { senhaIgualUsuario: true };
  } else {
    return null;
  }
}
