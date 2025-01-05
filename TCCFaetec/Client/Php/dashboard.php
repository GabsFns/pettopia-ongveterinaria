<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../../App/Ui/Css/dashboard.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>




  <main>
    <aside class="sidebar">
      <ul>
        <div id="iconSide">
          <img src="../../App/Ui/Images/iconPettopia.png" alt="" width="140px">
        </div>

        <?php
        session_start();  // Inicie a sessão
        if (isset($_SESSION['user'])) {
          $user = $_SESSION['user'];  // Atribua a variável da sessão à variável $user
        } else {
          $user = null;  // Caso contrário, defina $user como null
        }
        ?>
        <section id="EmailUser">
          <li>
            <?php if (isset($user) && !empty($user)): ?>
            <p>Email: <?= htmlspecialchars($user['email'] ?? 'Email não disponível'); ?></p>
            <?php else: ?>
            <p>Não autenticado</p>
            <?php endif; ?>
          </li>
        </section>
        <p>Home</p>
        <li>
          <a href="../../App/View/index.html"><i class="fa-solid fa-house"></i><span class="menu-text">Página
              Inical</span></a>
        </li>
        <li class="menu-link" data-target="dashboard">
          <a href="#"><i class="fas fa-tachometer-alt"></i><span class="menu-text">Dashboard</span></a>
        </li>
        <p>Serviços</p>
        <!-- <li class="dropdown">
          <a href="#" class="dropdown-toggle">
            <i class="fas fa-calendar-alt"></i><span class="menu-text">Consultas</span>
            <span class="arrow">&#9662;</span>
     
          </a>
          <ul class="dropdown-menu">
            <li>
              <a href="#"><i class="fas fa-cut"></i><span class="menu-text">Castração</span></a>
            </li>

            <li>
              <a href="#"><i class="fas fa-hospital"></i><span class="menu-text">Hospitalar</span></a>
            </li>
            <li>
              <a href="#"><i class="fas fa-syringe"></i><span class="menu-text">Vacínas</span></a>
            </li>
          </ul>
        </li> -->
        <li class="menu-link" data-target="denuncia">
          <a href="#"><i class="fas fa-exclamation-triangle"></i><span class="menu-text">Denúncias</span></a>
        </li>
        <li class="menu-link" data-target="meusAnimais">
          <a href="#"><i class="fas fa-exclamation-triangle"></i><span class="menu-text">Meus Animais</span></a>
        </li>
        <li class="menu-link" data-target="comprovante">
          <a href="#"><i class="fas fa-exclamation-triangle"></i><span class="menu-text">Comprovantes</span></a>
        </li>
        <li class="menu-link" data-target="solicitacoes">
          <a href="#"><i class="fas fa-exclamation-triangle"></i><span class="menu-text">Pedidos de adoções</span></a>
        </li>
        <li class="menu-link" data-target="perfil">
          <a href="#"><i class="fas fa-user"></i><span class="menu-text">Perfil</span></a>
        </li>
        <div id="Bttsair">
          <li>
            <a href="#" id="logoutButton"><i class="fas fa-sign-out-alt"></i><span class="menu-text">Sair</span></a>
          </li>
        </div>
      </ul>
    </aside>
    <div id="dashboard" class="content-section" class="content-section">
      <article class="content">

        <aside id="CaixaPerfil">
          <div id="EncaixePerfil">
            <div class="SubCaixaPerfil">
              <section id="NomeUser">
                <?php if ($user): ?>
                <?= htmlspecialchars($user['nome']); ?>

                <?php else: ?>
                Não autenticado
                <?php endif; ?>
              </section>
              <p>Estamos felizes em tê-lo na PetTopia. Navegue pelo menu à esquerda para acessar seções importantes.
                Para qualquer ajuda, nossa equipe está à disposição.</p>

            </div>
            <img src="../../App/Ui/Images/undraw_welcome_cats_thqn.svg" width="150px" alt="">
          </div>
          <div class="SubCaixaPerfil2">
          <a href="../../App/View/index.html"><button id="PaginaInicial">Pagina Inicial</button></a>
          </div>
        </aside>
        <article id="CaixaDashboard1">
          <aside id="CaixaDenuncia">

            <div id="subCaixaDenuncia">
              <h1>Total de Denuncias</h1>
              <p>0</p>
            </div>
            <div id="subCaixaDenuncia2">
              <img id="imgCat" src="../../App/Ui/Images/undraw_cat_epte.svg" alt="" alt="" />
            </div>
          </aside>
          <a href="../../App/View/doacao.html">
          <aside id="CaixaAdocao">
            <div class="SubCaixaAdocao">
              <h1>Faça uma Contribuição e Ajude Vidas</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus possimus perferendis quo
              </p>
            </div>
            <img src="../../App/Ui/Images/seta-direita (1).png" alt="" width="40px" />

          </aside>
                </a>
          <a href="../../App/View/adocao.html">
            <aside id="CaixaDoacao">
              <div id="subCaixaDoacao">
                <div>
                  <h1>Quer adotar ou Doar um Companheiro?</h1>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing .</p>
                </div>

                <img src="../../App/Ui/Images/plano-de-saude.png" alt="" width="40px" />
              </div>
              <div id="subCaixaDoacao2">
                <button>
                  <img src="../../App/Ui/Images/seta-direita (1).png" alt="" width="40px" />
                </button>

              </div>
            </aside>
                </a>
          <div class="grafico" style="width: 400px; height: ;">
            <canvas id="graficoDenuncias"></canvas>
          </div>
        </article>
        <section class="Divisao">

          

          <div class="grafico">
            <aside id="graficotext">
              <div>
                <h2>Grafico geral de Doações</h2>
              </div>
              <a href="../../App/View/doacao.html"><button>Realizar Doação</button></a>
            </aside>

            <canvas id="meuGrafico" width="1140" height="530"></canvas>
          </div>

        </section>

        <section class="Divisao1">




        </section>

    </div>


    <section id="perfil" style="display: none" class="content-section">
      <h1>Editar Perfil</h1>
      <form action="">
        <label for="">Nome:</label class="required">
        <input type="text" id="nome" value="<?= htmlspecialchars($user['nome'] ?? ''); ?>" placeholder="Nome"
          disabled />
        <label for="">CPF:</label class="required">
        <input type="text" id="cpf_Cliente" value="<?= htmlspecialchars($user['cpf_Cliente'] ?? ''); ?>"
          placeholder="CPF" disabled />
        <label for="">Telefone:</label class="required">
        <input type="text" id="telefone_Cliente" value="<?= htmlspecialchars($user['telefone_Cliente'] ?? ''); ?>"
          placeholder="Telefone" disabled />
        <label for="">Data Nascimento:</label class="required">
        <input type="date" id="data_nascimento" value="<?= htmlspecialchars($user['data_nascimento'] ?? ''); ?>"
          placeholder="Data de Nascimento" disabled />
        <label for="">Email:</label class="required">
        <input type="email" id="email" value="<?= htmlspecialchars($user['email'] ?? ''); ?>" placeholder="Email"
          disabled />




        <div id="CaixaBtt1">
          <p id="EsqueciSenhaModal"><a href="#" onclick="openModal('emailModal')">Redefinir Senha</a></p>

          <div id="CaixaBtt2">
            <button id="editarDados">Editar</button>
            <button id="salvarDados">Salvar</button>
          </div>
        </div>
      </form>
    </section>


    <section id="denuncia" style="display: none" class="content-section">
      <Button id="realizarDenunciaBtn">Realizar Denúncias</Button>
      <Button id="visualizarDenunciaBtn">Visualizar Denúncias</Button>


      <p></p>
      <div id="RealizarDenuncia">
        <h1>Realizar Denuncia</h1>
        <form action="" id="form1Denuncia">
          <label class="required" for="">CEP</label>
          <div>
            <input type="text" id="cep" name="cep" placeholder="Insira seu CEP" maxlength="9">
            <button type="button" id="BuscarCEP">Buscar CEP</button> <!-- Altere para type="button" -->
          </div>
          <label class="required" for="">Logradouro</label>
          <input type="text" id="logradouro" name="logradouro" placeholder="Insira nome da Rua" disabled>

          <label class="required" for="">Cidade</label> 
          <input type="text" id="cidade" placeholder="Cidade" readonly  disabled/>

          <label class="required" for="">UF</label>
          <input type="text" id="uf" name="uf" disabled>

          <label class="required" for="">Bairro</label>
          <input type="text" id="bairro" name="bairro" disabled>

          <label for="">Complemento</label>
          <input type="text" id="complemento" name="complemento"
            placeholder="Insira seu complemento(Casa, Apartamento, Condominio...)">

            <label for="">Numero</label>
            <input type="text" id="numero" placeholder="Número" />

          <button id="continuarBtn">Continuar</button>
        </form>

        <form action="" style="display: none" id="form2Denuncia">
          <label class="required" for="">Tipo da Denunica</label">
          <select name="" id="tipoDenuncia" class="required">
          <option value="null">Selecione uma opção</option>
            <option value="VIOLENCIA">Violencia</option>
            <option value="PERDIDO">Perdido</option>
            <option value="ABANDONADO">Abandono</option>
          </select>
          <fieldset>
            <legend>Descrição</legend>
            <textarea name="descricao" id="descricao" cols="30" rows="60"></textarea>
          </fieldset>
          <button id="voltarBtn">Voltar</button>
          <button id="enviarDenuncia">Enviar</button>
        </form>
      </div>
      <div id="VisualizarDenuncia" style="display: none;">
        <h1>Visualizar Denuncias</h1>
        <div class="table-container">
          <table id="tabelaDenuncias" class="futuristic-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Data</th>
                <th>Configuração</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
        <div id="modalEdicao" class="modal" style="display:none;">
          <div class="modal-content">
            <span class="close" id="closeModal">&times;</span>
            <h2>Editar Denúncia</h2>
            <form id="formEdicao">
              <label for="descricao">ID:</label>
              <input type="text" id="idDenuncia" name="idDenuncia" required disabled>


              <fieldset>
                <legend class="required" >Descrição</legend>
                <textarea name="descricao" required id="descricaoEdicao" cols="30" rows="60"></textarea>
              </fieldset>

              <label for="tipoDenuncia">Tipo de Denúncia:</label>
              <input type="text" id="tipoDenunciaModal2" name="tipoDenunciaModal2" required readonly>

              <label for="statusGeral">Status Geral:</label>
              <input type="text" id="statusGeral" name="statusGeral" required disabled>

              <label for="dataDenuncia">Data da Denúncia:</label>
              <input type="date" id="dataDenuncia" name="dataDenuncia" required disabled>

              <button id="SalvarEdicao">Salvar Alterações</button>
            </form>
          </div>
        </div>
      </div>
    </section>


    <section id="meusAnimais" style="display: none" class="content-section">
      <div id="CaixaAnimaisSide">
        <aside id="content" class="content">

        </aside>
        <div id="SubForm">
          <h1>Cadastrado de Animal</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas totam natus, adipisci illo excepturi
            sequi laborum saepe quasi nulla eum dolorum incidunt. Sequi non in atque tempore at eaque autem.</p>
          <form action="" id="animalForm2">
            <label class="required" for="nome">Nome</label>
            <input type="text" name="nomePet" id="nomePet" placeholder="Digite o nome do seu Pet..." required>
            <fieldset>
              <legend>Descrição</legend>
              <textarea name="descricaoPet" id="descricaoPet" cols="50" rows="5"></textarea>
            </fieldset>

            <label class="required" for="especie">Espécie</label>
            <select name="especie" id="especie" required onchange="atualizarRacas()">
              <option value="">Selecione...</option>
            </select>

            <label class="required" for="especie">Sexo</label>
            <select name="sexo" id="sexo" required onchange="atualizarRacas()">
              <option value="FEMEA">FEMEA</option>
              <option value="MACHO">MACHO</option>
            </select>

            <label class="required" for="raca">Raça</label>
            <select id="raca2">
              <option value="">Selecione...</option>
            </select>

            <label class="required" for="idade">Idade</label>
            <select id="idade2" required>
              <option value="">Selecione...</option>
            </select>

            <label class="required" for="cor">Cor</label>
            <input type="text" name="cor" id="cor" placeholder="Digite a cor" required>

            <label class="required" for="peso">Peso</label>
            <input type="number" name="peso" id="peso" placeholder="Digite o peso" required>

            <div class="custom-file-input">
              <label class="required" for="fileInput">Insira uma foto do seu animal</label>
              <input type="file" id="fileInput" name="fotoAnimal" accept="image/*" onchange="showFileName(event)">
              <span id="fileNameDisplay">Nenhum arquivo Selecionado</span>
            </div>
            <input type="hidden" name="adocao" value="false">
            <button id="LimparBtt">Limpar Campos</button>
            <button onclick="cadastrarAnimal2(event)" id="EnviarBtt">Enviar Pedido de Doação</button>
          </form>
        </div>
      </div>

    </section>

    <section id="comprovante" style="display: none" class="content-section">

      <h1>Comprovantes</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit eligendi rem aliquam vero ab, nobis tempora
        ut veritatis magnam saepe ullam! Non, accusantium minima fuga laudantium alias pariatur reiciendis dolorem!</p>
      <div class="Comprovantes"></div>


      </div>
    </section>


    <section id="solicitacoes" style="display: none" class="content-section">
    <div id="textPedidos">
      <h1>Visualizar Solicitações de Adoção</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur consectetur dicta nam reprehenderit
        possimus vero corrupti, nemo, suscipit magnam doloremque asperiores officiis quasi, est aliquid error nisi iste
        recusandae odit?</p>
        </div>
        <nav id="navPedidos">
          <ul>
            <li onclick="selecionarItem(this)">Pedidos Pendentes <span id="amarelo"></span></li>
            <li onclick="selecionarItem(this)">Pedidos Negados <span id="vermelho"></span></li>
            <li onclick="selecionarItem(this)">Pedidos Aceitos <span id="verde"></span></li>
          </ul>
          </nav>
        <section id="caixaprincipalPedidos">
        
           </section>
        </div>
       
</section>        
</section>
    



    </article>



  </main>

  <div id="VizualizarPedidos" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2 id="modalNome">Nome do Animal</h2>
            <p><strong>Espécie:</strong> <span id="modalEspecie">Espécie Desconhecida</span></p>
            <p><strong>Raça:</strong> <span id="modalRaca">Raça Desconhecida</span></p>
            <p><strong>Idade:</strong> <span id="modalIdade">Idade Desconhecida</span></p>
            <p><strong>Cor:</strong> <span id="modalCor">Cor Desconhecida</span></p>
            <p><strong>Peso:</strong> <span id="modalPeso">Peso Desconhecido</span></p>
            <p><strong>Descrição:</strong> <span id="modalDescricao">Descrição não fornecida</span></p>
            <img id="modalFoto" alt="Foto do Animal" width="200">
        </div>
    </div>

  <div id="confirmLogoutModal" class="modal">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <h2>Confirmar Logout</h2>
      <p>Você tem certeza que deseja sair?</p>
      <button id="confirmLogout">Sim</button>
      <button id="cancelLogout">Cancelar</button>
    </div>
  </div>

  <div id="emailModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal('emailModal')">&times;</span>
      <h2>Esqueci a Senha</h2>
      <label for="email">Digite seu email:</label>
      <input type="email" id="emailInput" required>
      <button onclick="enviarEmail(event)">Enviar Token</button>
      <div id="emailError" class="error-message"></div>
    </div>
  </div>

  <!-- Modal para inserir o token -->
  <div id="tokenModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal('tokenModal')">&times;</span>
      <h2>Verificação de Token</h2>
      <label for="token">Digite o token que você recebeu por email:</label>
      <input type="text" id="tokenInput" required>
      <button onclick="validarToken(event)">Validar Token</button>
      <div id="tokenError" class="error-message"></div>
    </div>
  </div>

  <!-- Modal para redefinir a senha -->
  <div id="novaSenhaModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal('novaSenhaModal')">&times;</span>
      <h2>Redefinir Senha</h2>
      <label for="newPassword">Digite sua nova senha:</label>
      <input type="password" id="newPasswordInput" required>
      <button onclick="resetarSenha(event)">Redefinir Senha</button>
      <div id="senhaError" class="error-message"></div>
    </div>
  </div>
  <div id="loadingOverlay" class="loading-overlay" style="display: none;">
    <div class="spinner"></div>
    <p>Enviando token, por favor aguarde...</p>
  </div>


  <div id="modalAnimal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="fecharModal()">&times;</span>

        <h2>Atualizar Dados do Animal</h2>
        <div id="modalAnimalItem">
            <input type="hidden" id="idAnimalInput"> <!-- Campo oculto para o ID do animal -->

            <p><strong>Nome:</strong></p>
            <input type="text" id="nomeAnimalInput">

            <p><strong>Espécie:</strong></p>
            <input type="text" id="especieAnimalInput">

            <p><strong>Raça:</strong></p>
            <input type="text" id="racaAnimalInput">

            <p><strong>Idade:</strong></p>
            <input type="text" id="idadeAnimalInput">

            <p><strong>Cor:</strong></p>
            <input type="text" id="corAnimalInput">

            <p><strong>Peso:</strong></p>
            <input type="text" id="pesoAnimalInput">

            <p><strong>Descrição:</strong></p>
            <input type="text" id="descricaoAnimalInput">

            <!-- Exibição da Foto -->
            <img id="fotoAnimalExibicao" src="" alt="Foto do animal" style="display:none;">
            <!-- Campo de Upload de Foto -->
            <input type="file" id="fotoAnimalInput">

            <div>
                <button onclick="EnviarAtualizacaoAnimal()">Atualizar Dados</button>
                <button onclick="DeletarAnimal(document.getElementById('idAnimalInput').value)">Deletar Animal</button>
            </div>
        </div>
    </div>
</div>

  <!-- Modal -->
  <div class="modal fade" id="pdfModal" tabindex="-1" aria-labelledby="pdfModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pdfModalLabel">Visualizar PDF</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <iframe id="pdfViewer" src="" frameborder="0"></iframe>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>



</body>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="../../Api/authComprovantes.js"></script>
<script src="../Components/Dashboard.js"></script>
<script src="../Components/PerfilBtt.js"></script>
<script src="../Components/animacao.js"></script>
<script src="../../Api/ExibirDados.js"></script>
<script src="../../Api/authEsqueciSenhaPerfil.js"></script>
<script src="../Components/NavSideBar.js"></script>
<script src="../Components/ProximaPag.js"></script>
<script src="../../Api/ViaCep.js"></script>
<script src="../Components/denuncianav.js"></script>
<script src="../Components/countDenuncias.js"></script>
<script src="../../Api/realizarDenuncia.js"></script>
<script src="../../Api/AlterecoesDenuncias.js"></script>
<script src="../../Api/authgrafico.js"></script>
<script src="../../Api/authAdocoesAnimais.js"></script>

<script src="../Components/countDenuncias.js"></script>
<script src="../../Api/pedidos.js"></script>
<script src="../Components/pedidos.js"></script>
<script src="../../Api/authCarregarAnimais.js"></script>
</html>